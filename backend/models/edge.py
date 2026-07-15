from dataclasses import dataclass


@dataclass
class CallEdge:

    caller: str

    callee: str

    file: str

    line: int