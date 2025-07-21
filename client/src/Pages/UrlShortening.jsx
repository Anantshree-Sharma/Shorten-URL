import { UrlForm, Error } from "../Components";
import { useUrl } from "../Context/urlContext.jsx";

function UrlShortening() {
  const { error, setError } = useUrl();
  return <UrlForm />;
}

export default UrlShortening;
