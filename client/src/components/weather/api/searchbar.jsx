import { Autocomplete, TextField } from '@mui/material';

const cityOptions = [
  // 🌴 Tamil Nadu Districts
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Tiruppur', 'Vellore', 'Erode',
  'Thoothukudi', 'Dindigul', 'Thanjavur', 'Ranipet', 'Sivaganga', 'Karur', 'Krishnagiri', 'Nagapattinam', 'Namakkal',
  'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Theni', 'The Nilgiris', 'Tenkasi', 'Villupuram', 'Virudhunagar',
  'Ariyalur', 'Chengalpattu', 'Dharmapuri', 'Kallakurichi', 'Kanniyakumari', 'Mayiladuthurai', 'Tirupathur', 'Tiruvarur',
  'Cuddalore', 'Kanchipuram', 'Tiruvallur',

  // 🏙️ Popular Indian Cities
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Kolkata', 'Pune', 'Jaipur', 'Surat', 'Lucknow', 'Patna',
  'Indore', 'Bhopal', 'Chandigarh', 'Nagpur', 'Kanpur'
];

export default function SearchBar({ city, setCity, onSearch }) {
  return (
    <Autocomplete
      freeSolo
      options={cityOptions}
      value={city}
      onChange={(event, newValue) => setCity(newValue)}
      onInputChange={(event, newInputValue) => setCity(newInputValue)}
      onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      renderInput={(params) => (
        <TextField {...params} label="Enter city or district" fullWidth sx={{ mt: 2 }} />
      )}
    />
  );
}
    