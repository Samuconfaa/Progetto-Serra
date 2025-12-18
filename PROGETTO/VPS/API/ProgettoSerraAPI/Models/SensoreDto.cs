namespace ProgettoSerraAPI.Models
{
    public class SensoreDto
    {
        public int Luce { get; set; }
        public double Temperatura { get; set; }
        public double Umidita { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
