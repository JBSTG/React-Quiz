using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{
    public class QuestionAPIController : ApiController
    {
        // GET: api/Questions
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Questions/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Questions
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Questions/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Questions/5
        public void Delete(int id)
        {
        }
    }
}
