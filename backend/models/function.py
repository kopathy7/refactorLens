from dataclasses import dataclass


@dataclass
class FunctionInfo:
    name: str
    file: str
    module: str
    line: int