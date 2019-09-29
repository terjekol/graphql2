using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;

namespace graphql2.GraphQL
{
    public class AuthorInputType : InputObjectGraphType
    {
        public AuthorInputType()
        {
            Name = "authorInput";
            Field<NonNullGraphType<StringGraphType>>("name");
        }
    }
}
