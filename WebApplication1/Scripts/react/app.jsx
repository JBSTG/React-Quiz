class Quiz extends React.Component {
    //Constructors are used for assigning state.
    constructor(props) {
        super();
        this.state = {
            questionInfo: [],
            questionDOM: [],
            selectedAnswers: [],
            answerGrades:[],
            quizCompleted: false,
            finalScore: null,
            scoreMessage: null
        }
        this.gradeQuiz = this.gradeQuiz.bind(this);
        this.storeSelection = this.storeSelection.bind(this);
        this.renderQuestions = this.renderQuestions.bind(this);
    }
    gradeQuiz() {
        var numQuestions = this.state.questionInfo.length;
        var numCorrect = 0;
        var grades = [];
        for (var i = 0; i < numQuestions; i++) {
            if (this.state.selectedAnswers[i] == this.state.questionInfo[i].CorrectAnswer) {
                numCorrect++;
                grades.push(1);
            } else {
                grades.push(0);
            }
        }
        var score = Math.floor(numCorrect / numQuestions * 100);
        var newScoreMessage = "";
        if (score > 75) {
            newScoreMessage = "Excellent!";
        }
        if (score <= 75 && score > 50) {
            newScoreMessage = "Pretty good.";
        }
        if (score <= 50) {
            newScoreMessage = "Lad.";
        }
        this.setState({
            quizCompleted: true,
            finalScore: score,
            scoreMessage: newScoreMessage,
            answerGrades: grades
        });
    }
    storeSelection(newAnswer, i) {
        var x = this.state.selectedAnswers;
        x[i] = newAnswer;
        this.setState({ selectedAnswers: x });
        console.log(this.state.selectedAnswers);
    }
    componentDidMount() {
        fetch("api/Question")
            .then((res) => { return res.json() })
            .then((res => {
                console.log(res);
                var a = [];
                for (var i = 0; i < res.length;i++) {
                    a.push("");
                }
                this.setState({ questionInfo: res, selectedAnswers:a });
                console.log(this.state);
            }));
    }
    renderQuestions() {
        var q = [];
        for (var i = 0; i < this.state.questionInfo.length; i++) {
            q.push(<Question
                storeSelection={this.storeSelection}
                prompt={this.state.questionInfo[i].QuestionPrompt}
                key={i}
                index={i}
                options={this.state.questionInfo[i].Options}
                correctAnswer={this.state.questionInfo[i].CorrectAnswer}
                onClick={this.gradeQuiz}
                quizCompleted={this.state.quizCompleted}
            />);
        }
        return q;
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="jumbotron quiz-header">
                    <h1>React Quiz</h1>
                    <p>Created using ReactJS and ASP.NET WebAPI.</p>
                </div>
                <StickyQuestionProgressBar grades={this.state.answerGrades} quizCompleted={this.state.quizCompleted} selectedAnswers={this.state.selectedAnswers} />
                <div className = "row spacer"></div>
                {this.renderQuestions()}
                <div className="row">
                    <div className="col-md-6 col-md-offset-2 col-12">
                        <button onClick={this.gradeQuiz} disabled={this.state.quizCompleted} className="submit-button">Submit</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 col-md-offset-2 col-12">
                        <div className={this.state.quizCompleted ? "" : "hidden"}>
                            <h1>{this.state.finalScore}%</h1>
                            <p>{this.state.scoreMessage}</p>
                        </div>
                    </div>
                </div>
                <div className="page-footer"><p>React Quiz - Created by Joel Staggs</p></div>
            </div>
        )
    }
}

class Question extends React.Component {

    constructor(props) {
        //Classes cannot make use of 'this' until super has been called.
        super()
        this.changeSelection = this.changeSelection.bind(this);

        this.state = {
            questionIndex: props.index,
            prompt: props.prompt,
            correctAnswer: props.correctAnswer,
            selectedAnswer: null,
            selectedIndex: -1,
            options: props.options,
        }
    }

    changeSelection(selectionIndex, selectionAnswer) {
        this.setState({
            selectedIndex: selectionIndex,
            selectedAnswer: selectionAnswer
        });
        this.props.storeSelection(selectionAnswer, this.state.questionIndex);
    }

    render() {
        var op = [];
        for (var i = 0; i < this.state.options.length; i++) {
            op.push(<QuizButton quizCompleted={this.props.quizCompleted} correctAnswer={this.state.correctAnswer} onClick={this.changeSelection} buttonText={this.state.options[i]} key={i} index={i} selectedIndex={this.state.selectedIndex} ></QuizButton>);
        }
        console.log(this.props.quizCompleted);
        return (
            <div className="row" id={this.props.index+1}>
                <div className="col-md-6 col-md-offset-2 col-12">
                    <div className="question">
                        <p>{this.state.prompt}</p>
                        {op}
                    </div>
                </div>
            </div>
        )
    }
}

class QuizButton extends React.Component {
    constructor() {
        super()
        this.buttonClassName = this.buttonClassName.bind(this);
    }
    buttonClassName() {
        var cname = "";
        var selected = this.props.selectedIndex == this.props.index;
        var correct = this.props.correctAnswer == this.props.buttonText;
        var finished = this.props.quizCompleted;


        if (!finished) {
            cname = selected ? "selected-button":"unselected-button";
        }

        if (finished && selected) {
            cname = correct ? "selected-button button-correct" : "selected-button button-incorrect";
        }

        if (finished && !selected) {
            cname = correct ? "unselected-button button-correct" : "unselected-button";
        }


        return cname;
    }

    render() {
        return (
            <button
                onClick={() => this.props.onClick(this.props.index, this.props.buttonText)}
                className={this.buttonClassName()}
            >
                {this.props.buttonText}
            </button>
        )
    }
}
class StickyQuestionProgressBar extends React.Component {
    constructor() {
        super()
        this.handleScroll = this.handleScroll.bind(this)
        this.renderIcons = this.renderIcons.bind(this)
        this.scrollToSection = this.scrollToSection.bind(this)
        this.renderToolTip = this.renderToolTip.bind(this)
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.setState({ originalOffsetTop: ReactDOM.findDOMNode(this).offsetTop });
    }

    handleScroll() {
        var n = ReactDOM.findDOMNode(this);
        if (window.pageYOffset > this.state.originalOffsetTop) {
            n.className = "sticky question-bar";
        } else {
            n.className = "question-bar";
        }
    }
    scrollToSection(e) {
        var questionNumber = parseInt(e.target.getAttribute("index")) + 1;
        var height = document.getElementById(questionNumber).getBoundingClientRect().height;
        var top = document.getElementById(questionNumber).getBoundingClientRect().top;
        document.getElementById(questionNumber).scrollIntoView({ behavior: "smooth",block:"center" });
    }
    renderIcons() {
        var selectionIcons = [];
        for (var i = 0; i < this.props.selectedAnswers.length; i++) {
            if (this.props.quizCompleted) {
                selectionIcons.push(<div onClick={this.scrollToSection} index={i} className={this.props.grades[i] == 1 ? "selection-icon icon-correct" : "selection-icon icon-incorrect"} key={i}></div>);
            } else {
                selectionIcons.push(<div onClick={this.scrollToSection} index={i} className={this.props.selectedAnswers[i] == "" ? "selection-icon" : "selection-icon icon-answered"} key={i}></div>);
            }
        }
        return selectionIcons;
    }
    renderToolTip() {
        return <p>(Clicking an icon scrolls to that question.)</p>;
    }
    render() {
        return (
            <div className="question-bar">
                {this.renderIcons()}
                {this.renderToolTip()}
            </div>
        )
    }
}
ReactDOM.render(< Quiz />, document.getElementById('myContainer')); 