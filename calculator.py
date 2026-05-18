from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
import ast
import operator as _op

app = FastAPI(title="Calculator API")

# Serve the static UI from the "static" directory at /static
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", include_in_schema=False)
async def home():
    return FileResponse("static/index.html")


class CalcRequest(BaseModel):
    expr: Optional[str] = None
    a: Optional[float] = None
    b: Optional[float] = None
    op: Optional[str] = None


# Safe expression evaluation using ast
_OPERATORS = {
    ast.Add: _op.add,
    ast.Sub: _op.sub,
    ast.Mult: _op.mul,
    ast.Div: _op.truediv,
    ast.Pow: _op.pow,
    ast.Mod: _op.mod,
    ast.FloorDiv: _op.floordiv,
}


def _eval_node(node):
    if isinstance(node, ast.BinOp):
        left = _eval_node(node.left)
        right = _eval_node(node.right)
        op_type = type(node.op)
        if op_type in _OPERATORS:
            return _OPERATORS[op_type](left, right)
        raise HTTPException(status_code=400, detail="Unsupported operator")
    if isinstance(node, ast.UnaryOp):
        operand = _eval_node(node.operand)
        if isinstance(node.op, ast.UAdd):
            return +operand
        if isinstance(node.op, ast.USub):
            return -operand
        raise HTTPException(status_code=400, detail="Unsupported unary operator")
    if isinstance(node, ast.Constant):
        if isinstance(node.value, (int, float)):
            return node.value
    if isinstance(node, ast.Num):  # for older AST nodes
        return node.n
    raise HTTPException(status_code=400, detail="Unsupported expression component")


def eval_expr(expr: str):
    try:
        parsed = ast.parse(expr, mode="eval")
        return _eval_node(parsed.body)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid expression")


@app.post("/api/calc")
async def calc(req: CalcRequest):
    """Calculate a result from either a free-form `expr` or structured `a`, `b`, `op`.

    Examples:
    - POST { "expr": "2 + 2 * (3 - 1)" }
    - POST { "a": 5, "b": 2, "op": "+" }
    """
    if req.expr:
        result = eval_expr(req.expr)
    elif req.a is not None and req.b is not None and req.op:
        ops = {
            "+": _op.add,
            "-": _op.sub,
            "*": _op.mul,
            "/": _op.truediv,
            "%": _op.mod,
            "**": _op.pow,
        }
        if req.op not in ops:
            raise HTTPException(status_code=400, detail="Unsupported operator")
        try:
            result = ops[req.op](req.a, req.b)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
    else:
        raise HTTPException(status_code=400, detail="Provide 'expr' or 'a','b','op'")

    return JSONResponse({"result": result})
