using Data.Context;
using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Data.Repositories
{
    public class AuthorizedRepository : IAuthorized
    {
        private readonly OnlineMotorContext _db;

        public AuthorizedRepository(OnlineMotorContext context)
        {
            _db = context;
        }

        public void Add(Authorized obj)
        {
            _db.Set<Authorized>().Add(obj);
            _db.SaveChanges();
        }

        public IEnumerable<Authorized> GetAll()
        {
            return _db.Set<Authorized>().Where(x => !x.Excluido && x.Liberado);
        }

        public IEnumerable<Authorized> GetAllByBrand(string brand)
        {
            return _db.Set<Authorized>().Where(x => x.Marca == brand);
        }

        public Authorized GetById(int id)
        {
            return _db.Set<Authorized>().Where(x => x.Id == id).FirstOrDefault();
        }
     

        public void Remove(Authorized obj)
        {
            obj.Excluido = true;
            obj.Liberado = false;

            _db.Entry(obj).State = EntityState.Modified;
            _db.SaveChanges();
        }

        public void Update(Authorized obj)
        {
            _db.Entry(obj).State = EntityState.Modified;
            _db.SaveChanges();
        }
        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
