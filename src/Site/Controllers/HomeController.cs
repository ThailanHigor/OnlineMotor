using Data.Interfaces;
using Data.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Site.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Site.Controllers
{
    public class HomeController : Controller
    {
        private static double DISTANCE_LIMIT => 10;
        private readonly ILogger<HomeController> _logger;
        private readonly IAuthorized _authorizedRepository;

        public HomeController(ILogger<HomeController> logger, IAuthorized authorized )
        {
            _logger = logger;
            _authorizedRepository = authorized;
        }

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Busca(string Marca, string Estado, string Cidade)
        {
            ViewBag.Brand = Marca;
            ViewBag.State = Estado;
            ViewBag.City = Cidade;

            return View();
        }

        public IActionResult GetPinsFromBrand(string Brand, float Latitude, float Longitude)
        {
            var authorizeds = _authorizedRepository.GetAllByBrand(Brand);
            var search = new SearchViewModel();

            foreach (var authorized in authorizeds)
            {
                //check if the distance of authorized is inside the avalaible radius
                var distance = Geolocation.CalculateDistance(Latitude, Longitude, Convert.ToDouble(authorized.Latitude), Convert.ToDouble(authorized.Longitude), 'K');
                if (distance > DISTANCE_LIMIT) continue;

                var Authorized = new AuthorizedViewModel()
                {
                    Id = authorized.Id,
                    Nome = authorized.Nome,
                    Titulo = authorized.Titulo,
                    Descricao = authorized.Descricao,
                    Endereco = authorized.Endereco,
                    Telefone = authorized.Telefone,
                    Latitude = Convert.ToDouble(authorized.Latitude),
                    Longitude = Convert.ToDouble(authorized.Longitude),
                    Email = authorized.Email,
                    HorarioFuncionamento = authorized.HorarioFuncionamento,
                    Servicos = authorized.Servicos
                };
                var geometry = new GeometryViewModel
                {
                    Coordinates = new List<double> { Convert.ToDouble(authorized.Longitude), Convert.ToDouble(authorized.Latitude) }
                };
                var property = new PropertyViewModel
                {
                    Title = authorized.Nome
                };
                var feature = new FeaturesViewModel
                {
                    Geometry = geometry,
                    Property = property
                };

                search.Features.Add(feature);
                search.Authorizeds.Add(Authorized);
            }

            var jsonString = JsonSerializer.Serialize(search);
            return Ok(jsonString);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}
