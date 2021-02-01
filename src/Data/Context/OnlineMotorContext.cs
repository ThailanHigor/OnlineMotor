using Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Data.Context
{
    public class OnlineMotorContext : DbContext
    {
        public OnlineMotorContext(DbContextOptions<OnlineMotorContext> options) : base(options)
        { }

        public DbSet<Authorized> Authorizeds { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public override int SaveChanges()
        {
            foreach (var entry in ChangeTracker.Entries()
                .Where(e => e.Entity.GetType().GetProperty("DataCadastro") != null))
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Property("DataCadastro").CurrentValue = DateTime.Now;
                    entry.Property("DataAtualizacao").CurrentValue = null;
                    entry.Property("Excluido").CurrentValue = false;
                    entry.Property("Liberado").CurrentValue = true;
                }

                if (entry.State == EntityState.Modified)
                {
                    entry.Property("DataCadastro").IsModified = false;
                    entry.Property("DataAtualizacao").CurrentValue = DateTime.Now;
                }
            }
            return base.SaveChanges();
        }
    }
}
