with open("./file.py","rb") as source:
    content = source.read()

with open("./file1.py","wb") as destination:
    destination.write(content)

print("File copied successfully")


# try:
#     10/0
# except ZeroDivisionError:
#     print("Zero Division error handled successfully")
