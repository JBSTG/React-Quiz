using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class MultipleChoiceQuestionModel
    {
        public string QuestionPrompt { get; set; }
        public string[] Options { get; set; }
        public string CorrectAnswer { get; set; }
    }
}