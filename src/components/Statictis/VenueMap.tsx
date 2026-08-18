import React from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface CenterItem {
  id: number;
  name: string;
  count: number;
  percentage: number;
  lat: number;
  lng: number;
}

interface CentersCardProps {
  centersData: CenterItem[];
}

// حتى الخريطة تعمل Zoom/Center تلقائي حسب الداتا
const MapBounds = ({ centers }: { centers: CenterItem[] }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!centers.length) return;

    if (centers.length === 1) {
      map.setView([centers[0].lat, centers[0].lng], 5);
      return;
    }

    const bounds = centers.map((center) => [
      center.lat,
      center.lng,
    ]) as [number, number][];

    map.fitBounds(bounds, {
      padding: [25, 25],
      maxZoom: 4,
    });
  }, [centers, map]);

  return null;
};

export const CentersCard: React.FC<CentersCardProps> = ({
  centersData,
}) => {
  const maxCount = Math.max(
    ...centersData.map((center) => center.count),
    1
  );

  return (
    <div className="w-80 bg-[#f8f9fa] rounded-3xl p-6 shadow-xs border border-gray-100 font-sans space-y-5">
      
      {/* Header */}
      <h3 className="text-xl font-bold text-gray-900 tracking-tight">
        Centers
      </h3>

      {/* Map */}
      <div className="h-40 w-full rounded-2xl overflow-hidden relative border border-gray-100/60">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          zoomControl={false}
          dragging={false}
          doubleClickZoom={false}
          scrollWheelZoom={false}
          attributionControl={false}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          <MapBounds centers={centersData} />

          {centersData.map((center) => (
            <CircleMarker
              key={center.id}
              center={[center.lat, center.lng]}
              radius={5}
              pathOptions={{
                color: "#ffffff",
                fillColor: "#000000",
                fillOpacity: 1,
                weight: 2,
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -5]}
                opacity={1}
              >
                <div className="text-xs font-semibold">
                  {center.name}
                  <br />
                  Courses: {center.count}
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Cities */}
      <div className="space-y-4 pt-1">
        {centersData.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No centers available
          </p>
        ) : (
          centersData.map((center) => {
            const percentage =
              center.percentage ??
              (center.count / maxCount) * 100;

            return (
              <div
                key={center.id}
                className="space-y-1.5"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                  <span>{center.name}</span>

                  <span className="text-gray-900 font-semibold">
                    {center.count}
                  </span>
                </div>

                <div className="w-full bg-[#e2ebf8]/70 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#9bb2e5] h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};