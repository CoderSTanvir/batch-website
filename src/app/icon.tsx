import { ImageResponse } from 'next/og';
import Image from 'next/image';

export const runtime = 'nodejs';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 192,
          height: 192,
          background: '#0F172A',
        }}
      >
        <img
          src="https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/agent-browser/fhYzKrcUfKt/349744ce61d904b83f5c1fbea1fddb43dc1f60c9ad63605524e4f78759e394a9.jpeg"
          alt="Batch Logo"
          width={192}
          height={192}
        />
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}
