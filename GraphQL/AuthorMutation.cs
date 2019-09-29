using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using graphql2.Database;

namespace graphql2.GraphQL
{
    public class AuthorMutation : ObjectGraphType
    {
        public AuthorMutation(ApplicationDbContext db)
        {
            Field<AuthorType>(
                "createAuthor",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<AuthorInputType>> { Name = "author" }),
                resolve: context =>
                {
                    var author = context.GetArgument<Author>("author");
                    author.Id = 1 + db.Authors.Max(a => a.Id);
                    db.Authors.Add(author);
                    db.SaveChanges();
                    return author;
                }
            );
        }
    }
}
