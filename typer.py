import pyautogui as py, datetime as tm

from time import sleep as sl
sl(10)

begin = tm.datetime.now()
while 1 :

    py.typewrite("app.get.into.it((req,res)):", interval = 0.25)
    sl(1)
    for i in "app.get.into.it((req,res)):":
        py.press("backspace")
        sl(0.1)
    print("TIME ESCAPED : ", tm.datetime.now() - begin)