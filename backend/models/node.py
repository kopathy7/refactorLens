from dataclasses import dataclass


@dataclass
class FunctionNode:

    id: str

    name: str

    file: str

    module: str

    line: int

    class_name: str | None

    is_async: bool

    is_method: bool