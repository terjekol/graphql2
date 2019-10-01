using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQL.Types;
using graphql2.Database;
using Microsoft.EntityFrameworkCore;

namespace graphql2.GraphQL
{
    public class AuthorMutation : ObjectGraphType
    {
        public AuthorMutation(ApplicationDbContext db)
        {
            Field<AuthorType>(
                "addBookToAuthor",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "name" },
                    new QueryArgument<NonNullGraphType<IdGraphType>> { Name = "id" }),
                resolve: context =>
                {
                    var name = context.GetArgument<string>("name");
                    var id = context.GetArgument<int>("id");
                    var dbAuthor = db.Authors
                        .Include(a => a.Books)
                        .First(a => a.Id == id);
                    dbAuthor.Books.Add(new Book { Name = name });
                    db.SaveChanges();
                    return dbAuthor;
                }
            );
        }
    }
}
