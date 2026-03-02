import React from "react";
import { AbsoluteFill } from "remotion";
import { Globe } from "lucide-react";
import { COLORS, FONT_FAMILY } from "./constants";

export const IranMilitarySituationThumbnail: React.FC = () => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(135deg, ${COLORS.bgDark}, ${COLORS.danger}25)`,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 80,
    }}
  >
    <div
      style={{
        marginBottom: 32,
      }}
    >
      <Globe size={200} color={COLORS.dangerLight} strokeWidth={2} />
    </div>
    <h1
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 64,
        fontWeight: 800,
        color: COLORS.textPrimary,
        textAlign: "center",
        margin: 0,
        maxWidth: 900,
        lineHeight: 1.2,
      }}
    >
      Tình hình chiến sự Iran
    </h1>
    <p
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 28,
        color: COLORS.textSecondary,
        marginTop: 16,
      }}
    >
      Bối cảnh · Các bên · Tác động
    </p>
  </AbsoluteFill>
);
