from pathlib import Path

from parser.python_parser import PythonParser

parser = PythonParser()

functions = parser.parse_functions(
    Path("cloned_repositories/test/sample.py")
)

for function in functions:
    print(function)