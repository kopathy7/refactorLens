from dataclasses import dataclass


@dataclass
class FunctionNode:
    name: str
    file: str
    line: int