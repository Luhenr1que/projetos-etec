import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const center = [-23.5505, -46.6333];
const stores = [
  { id: 1, nome: 'Mercado Fictício Centro', lat: -23.548, lon: -46.630 },
  { id: 2, nome: 'Horta Fictícia', lat: -23.558, lon: -46.637 },
  { id: 3, nome: 'Mercearia Fictícia Sul', lat: -23.575, lon: -46.641 },
];
const distance = (a, b) => {
  const rad = n => n * Math.PI / 180;
  const dLat = rad(b[0] - a[0]), dLon = rad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};
export default function MapaMercados({ navigation }) {
  const container = useRef(null), map = useRef(null), layer = useRef(null);
  const [position, setPosition] = useState(center), [radius, setRadius] = useState(2000);
  const [tilesEnabled, setTilesEnabled] = useState(false);
  const [status, setStatus] = useState('Centro inicial ilustrativo: São Paulo. Mercados fictícios, sem consulta ao Google Places.');
  const nearby = stores.filter(store => distance(position, [store.lat, store.lon]) <= radius);
  useEffect(() => {
    const instance = L.map(container.current, { zoomAnimation: false, fadeAnimation: false, markerZoomAnimation: false }).setView(center, 14); map.current = instance;
    layer.current = L.layerGroup().addTo(instance);
    let disposed = false;
    const resize = new ResizeObserver(() => { if (!disposed) instance.invalidateSize({ animate: false }); }); resize.observe(container.current);
    return () => { disposed = true; resize.disconnect(); instance.stop(); instance.remove(); map.current = null; };
  }, []);
  useEffect(() => {
    if (!map.current) return;
    layer.current.clearLayers();
    L.circle(position, { radius, color: '#6247AA', fillOpacity: 0.08 }).addTo(layer.current);
    L.circleMarker(position, { radius: 8, color: '#2563eb' }).bindPopup('Centro da busca').addTo(layer.current);
    nearby.forEach(store => L.circleMarker([store.lat, store.lon], { radius: 7, color: '#15803d' }).bindPopup(store.nome + ' — exemplo fictício').addTo(layer.current));
    map.current.setView(position, radius > 3000 ? 12 : 14, { animate: false });
  }, [position, radius]);
  useEffect(() => {
    if (!tilesEnabled || !map.current) return;
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', maxZoom: 19 });
    tiles.on('tileerror', () => setStatus('Mapa base indisponível. Lista e distâncias fictícias continuam acessíveis.'));
    tiles.addTo(map.current);
    return () => tiles.remove();
  }, [tilesEnabled]);
  const locate = () => {
    if (!navigator.geolocation) { setStatus('Geolocalização indisponível; mantenha o centro ilustrativo.'); return; }
    setStatus('Aguardando sua autorização de localização…');
    navigator.geolocation.getCurrentPosition(value => { setPosition([value.coords.latitude, value.coords.longitude]); setStatus('Localização usada somente nesta tela. Mercados continuam fictícios em São Paulo.'); }, () => setStatus('Localização negada ou indisponível. Centro ilustrativo mantido.'), { timeout: 10000 });
  };
  const button = { padding: '10px 12px', margin: '4px', borderRadius: 8, border: '1px solid #6247AA', background: '#fff', color: '#402770', cursor: 'pointer' };
  return <section style={{ overflowY: 'auto', height: '100%', background: '#f4f1fc', padding: 12, boxSizing: 'border-box', color: '#302343' }}>
    <button style={button} onClick={() => navigation.goBack()}>Voltar</button>
    <h1 style={{ fontSize: 24 }}>Mercados Próximos</h1>
    <p>DEMO — estabelecimentos fictícios. As rotas externas apontam apenas para coordenadas de exemplo.</p>
    <button style={button} onClick={locate}>Usar minha localização</button>
    <button style={button} onClick={() => { setPosition(center); setStatus('Centro ilustrativo restaurado.'); }}>Restaurar exemplo</button>
    <label style={{ display: 'block', margin: 10 }}>Raio da busca <select aria-label="Raio da busca" value={radius} onChange={e => setRadius(Number(e.target.value))}>{[1000, 2000, 5000].map(n => <option key={n} value={n}>{n / 1000} km</option>)}</select></label>
    <p role="status">{status}</p>
    <button style={button} onClick={() => setTilesEnabled(!tilesEnabled)}>{tilesEnabled ? 'Ocultar mapa base' : 'Carregar mapa base OpenStreetMap'}</button>
    <p style={{ fontSize: 12 }}>Carregar o mapa base envia requisições ao OpenStreetMap. Geolocalização só é solicitada pelo botão acima.</p>
    <div ref={container} aria-label="Mapa interativo com locais fictícios" style={{ height: 300, width: '100%', background: '#e3e8df' }} />
    <h2 style={{ fontSize: 20 }}>{nearby.length} mercados fictícios no raio</h2>
    {!nearby.length && <p>Nenhum exemplo neste raio. Restaure o centro ilustrativo para explorar a demo.</p>}
    <ul style={{ paddingLeft: 20 }}>{nearby.map(store => <li key={store.id} style={{ marginBottom: 12 }}><strong>{store.nome}</strong><p>{(distance(position, [store.lat, store.lon]) / 1000).toFixed(2)} km do centro selecionado</p><button style={button} onClick={() => map.current?.setView([store.lat, store.lon], 16, { animate: false })}>Ver no mapa</button><a href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lon}`} target="_blank" rel="noreferrer">Abrir rota de exemplo</a></li>)}</ul>
  </section>;
}
