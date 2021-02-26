from api import create_app

app = create_app()


@app.route("/<name>")
def hello_name(name):
    return f"Hello {name}!"


if __name__ == "__main__":
    app.run()
