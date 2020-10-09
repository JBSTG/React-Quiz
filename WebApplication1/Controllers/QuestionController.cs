using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class QuestionController : ApiController
    {

        //Create our question pool here.
        List<MultipleChoiceQuestionModel> QuestionPool = new List<MultipleChoiceQuestionModel>();
        public QuestionController()
        {
            QuestionPool.Add(new MultipleChoiceQuestionModel { 
                QuestionPrompt = "How should state be initialized within a component's constructor?",
                Options = new string[]{"this.state = {. . .}","setState({. . .})","this.setState({. . .})","State cannnot be set within the constructor."},
                CorrectAnswer = "this.state = {. . .}"
            });
            QuestionPool.Add(new MultipleChoiceQuestionModel
            {
                QuestionPrompt = "What does calling super(props) in the constructor accomplish?",
                Options = new string[] { "It creates the props object.", "Prevents other components from accessing props.", "Allows access to this.props within the constructor.", "Defines props as the component's state." },
                CorrectAnswer = "Allows access to this.props within the constructor."
            });
            QuestionPool.Add(new MultipleChoiceQuestionModel
            {
                QuestionPrompt = "What is the only attribute that can be passed to a React.Fragment Element?",
                Options = new string[] { "No attributes can be passed to a fragment.", "A reference to a parent container", "index", "key" },
                CorrectAnswer = "key"
            });
            QuestionPool.Add(new MultipleChoiceQuestionModel
            {
                QuestionPrompt = "Which function creates a react element within a supplied container element?",
                Options = new string[] { "ReactDOM.Render()", "ReactDOM.Create()", "ReactDom.Render()", "React.Render()" },
                CorrectAnswer = "ReactDOM.Render()"
            });
            QuestionPool.Add(new MultipleChoiceQuestionModel
            {
                QuestionPrompt = "Should setState() be called within a component's render function?",
                Options = new string[] { "Yes","No" },
                CorrectAnswer = "No"
            });
            QuestionPool.Add(new MultipleChoiceQuestionModel
            {
                QuestionPrompt = "What function allows access of DOM elements outside of the current React hierarchy?",
                Options = new string[] { "ReactDOM.find()", "ReactDOM.access()", "ReactDOM.createPortal()", "reactDOM.external()" },
                CorrectAnswer = "ReactDOM.createPortal()"
            });
        }

        // GET: api/Question
        public List<MultipleChoiceQuestionModel> Get()
        {
            return QuestionPool;
        }

        // GET: api/Question/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Question
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Question/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Question/5
        public void Delete(int id)
        {
        }
    }
}
