from flask import Flask, jsonify, render_template, redirect
from sqlalchemy import create_engine
import os

app = Flask(__name__)

# your port is probably 5432 not 5433 like mine is here
connection_string = "postgres:postgres@localhost:5432/totalcases"


@app.route("/")
def default():
    return render_template('home.html')


@app.route("/home.html")
def home():
    return render_template('home.html')


@app.route("/countytable.html")
def table1():
    return render_template('countytable.html')


@app.route("/countytable2.html")
def table2():
    return render_template('countytable2.html')


@app.route("/medicalmap.html")
def medical():
    return render_template('medicalmap.html')


@app.route("/vaccinetable.html")
def vaccine():
    return render_template('vaccinetable.html')


@app.route("/Page1.html")
def home1():
    return render_template('Page1.html')


@app.route("/Page2.html")
def home2():
    return render_template('Page2.html')


@app.route("/Page3.html")
def home3():
    return render_template('Page3.html')


@app.route("/Page4.html")
def home4():
    return render_template('Page4.html')


@app.route("/Page5.html")
def home5():
    return render_template('Page5.html')


@app.route("/Page6.html")
def home6():
    return render_template('Page6.html')


@app.route("/Page7.html")
def home7():
    return render_template('Page7.html')


@app.route("/Page8.html")
def home8():
    return render_template('Page8.html')


@app.route("/ethnicitydata.html")
def home9():
    return render_template('ethnicitydata.html')


@app.route("/testingsite.html")
def testsite():
    return render_template('testingsite.html')


@app.route("/graph.html")
def graph():
    return render_template('graph.html')


@app.route("/combined.html")
def combined():
    return render_template('combined.html')


@app.route("/Caliheatmap.html")
def caliheatmap():
    return render_template('Caliheatmap.html')


@app.route("/total_vaccinations_per_hundredMap.html")
def per100():
    return render_template('total_vaccinations_per_hundredMap.html')


@app.route("/casesMap.html")
def casesmap():
    return render_template('casesMap.html')


@app.route("/total_vaccinationMap.html")
def vaccinemap():
    return render_template('total_vaccinationMap.html')


@app.route("/deathsMap.html")
def deathmap():
    return render_template('deathsMap.html')


port = int(os.environ.get('PORT', 5000))

if __name__ == '__main__':
    app.run(debug=True, port=port)
