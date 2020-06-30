#!/usr/bin/python3

import os, os.path, sys

ENCODING = "utf-8"

# Merge all .js files in sourceDirectory.
def merge(sourceDirectory):
    files = os.listdir(sourceDirectory)
    
    contents = ""

    for fileName in files:
        if fileName.endswith(".js"):
            contents += "\n// Inserted file %s encoding='%s'" % (fileName, ENCODING)
            contents += "\n"

            fileObj = open(os.path.join(sourceDirectory, fileName))
            contents += fileObj.read()
            fileObj.close()

    return contents

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: " + str(sys.argv[0]) + " [DIRNAME]", file=sys.stderr)
        print("Sends output to stdout.", file=sys.stderr)
        sys.exit(1)

    dirName = sys.argv[1]
    print("\"use strict\";") # Enforce strict mode.
    print("(function()") # Wrap everything in a function...
    print("{")
    print(merge(dirName))
    print("})();")
    
