namespace backend_profitFill.Exceptions;

public class IdNotFoundException : Exception
{
    public int Id { get; private set; }

    public IdNotFoundException(int id) 
        : base($"ID {id} does not exist.")
    {
        this.Id = id;
    }

    public IdNotFoundException(int id, Exception innerException) 
        : base($"ID {id} does not exist.", innerException)
    {
        this.Id = id;
    }
}