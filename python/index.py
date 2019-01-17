def fact(n):
    if n == 1:
        return 1
    print(fact(n - 1))
    return n*fact(n - 1)


fact(4, 2)
