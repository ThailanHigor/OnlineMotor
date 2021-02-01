using Data.Models;
using System.Collections.Generic;

namespace Data.Interfaces
{
    public interface IAuthorized
    {
        void Add(Authorized obj);
        Authorized GetById(int id);
        IEnumerable<Authorized> GetAll();
        IEnumerable<Authorized> GetAllByBrand(string brand);
        void Update(Authorized obj);
        void Remove(Authorized obj);
        void Dispose();
    }
}
