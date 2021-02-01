using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Site.ViewModels
{
    public class SearchViewModel
    {
        public SearchViewModel()
        {
            Features = new List<FeaturesViewModel>();
            Authorizeds = new List<AuthorizedViewModel>();
        }

        [JsonPropertyName("features")]
        public List<FeaturesViewModel> Features { get; set; }
        [JsonPropertyName("authorizeds")]
        public List<AuthorizedViewModel> Authorizeds { get; set; }
    }

    public class AuthorizedViewModel
    {
        public int Id{ get; set; }
        public string Nome { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string Endereco { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string HorarioFuncionamento { get; set; }
        public string Servicos { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

    public class FeaturesViewModel
    {
        [JsonPropertyName("type")]
        public string Type => "Feature";

        [JsonPropertyName("geometry")]
        public GeometryViewModel Geometry { get; set; }

        [JsonPropertyName("properties")]
        public PropertyViewModel Property { get; set; }
    }
    
    public class GeometryViewModel
    {
        [JsonPropertyName("type")]
        public string Type => "Point";

        [JsonPropertyName("coordinates")]
        public List<double> Coordinates { get; set; }
    }

    public class PropertyViewModel
    {
        [JsonPropertyName("title")]
        public string Title { get; set; }
    }
}
