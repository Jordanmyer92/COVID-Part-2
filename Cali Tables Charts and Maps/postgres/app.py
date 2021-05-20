from flask import Flask, jsonify, render_template, redirect
from sqlalchemy import create_engine
import os

app = Flask(__name__)

# your port is probably 5432 not 5433 like mine is here
connection_string = "postgres:postgres@localhost:5432/California"


@app.route("/")
def default():
    return render_template('index.html')


@app.route("/test")
def test():
    return render_template('test.html', message='hi')


@app.route("/api")
def api():
    engine = create_engine(f'postgresql://{connection_string}')
    results = engine.execute("SELECT * FROM age").fetchall()
    data = []
    index = 0
    for item in results:
        data.append({'Age_Group': results[index][0],
                     'Cases': results[index][1],
                     'Date': results[index][2],
                     'Perecent_Cases': results[index][3],
                     'Deaths': results[index][4],
                     'Percent_Deaths': results[index][5],
                     'Ca_Population': results[index][6],
                     })
        index += 1
    return jsonify(data)


port = int(os.environ.get('PORT', 5000))

if __name__ == '__main__':
    app.run(debug=True, port=port)
