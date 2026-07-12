import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5efe6 0%, #f4c1e3 100%)",
          color: "#3D4246",
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div>Homebird Makes</div>
        <div style={{ marginTop: 20, fontSize: 34, fontWeight: 500 }}>Handmade Home Accessories</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
