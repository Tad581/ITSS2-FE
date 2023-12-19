const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

interface IProps {
  address?: string;
}

const MapContainer = (props: IProps) => {
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <iframe
        width='100%'
        height='400'
        style={{ border: 0 }}
        referrerPolicy='no-referrer-when-downgrade'
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${props.address}&zoom=14`}
      ></iframe>
    </div>
  );
};

export default MapContainer;
