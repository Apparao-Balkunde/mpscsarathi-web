# MPSC Sarathi - Oracle Cloud & Cloudflare Deployment Guide

या ॲपला **Oracle Cloud (Always Free VM)** वर डिप्लॉय करून **Cloudflare** सोबत कनेक्ट करण्याची सोपी आणि संपूर्ण पायरी-दर-पायरी मार्गदर्शिका खाली दिली आहे:

---

## पर्याय १: Oracle Cloud VM + Docker (सर्वात सोपी व स्थिर पद्धत)

### पायरी १: Oracle Cloud वर Instance (VM) तयार करणे
1. **Oracle Cloud Console** (cloud.oracle.com) मध्ये लॉगिन करा.
2. **Compute** -> **Instances** -> **Create Instance** वर क्लिक करा.
3. **Image**: Ubuntu 22.04 किंवा 24.04 LTS निवडा.
4. **Shape**:
   - `VM.Standard.A1.Flex` (Ampere ARM - Always Free, 4 OCPU, 24GB RAM पर्यंत मोफत) किंवा
   - `VM.Standard.E2.1.Micro` (AMD - Always Free)
5. **SSH Keys**: तुमची SSH Public Key जोडा किंवा नवीन Generate करून Private Key डाऊनलोड करा.
6. **Create** बटणावर क्लिक करा.

### पायरी २: Oracle Cloud Virtual Cloud Network (VCN) मध्ये Ports उघडणे
1. तुमच्या Instance च्या **Subnet** वर क्लिक करा.
2. **Security Lists** -> **Default Security List for...** वर क्लिक करा.
3. **Add Ingress Rules** वर क्लिक करा:
   - **Source CIDR**: `0.0.0.0/0`
   - **Destination Port Range**: `80, 443`
   - **Protocol**: `TCP`
4. **Add Ingress Rules** सेव्ह करा.

### पायरी ३: VM मध्ये लॉगिन करून Docker इन्स्टॉल करणे
SSH द्वारे तुमच्या VM मध्ये कनेक्ट करा:
```bash
ssh -i /path/to/your-key.key ubuntu@<YOUR_ORACLE_PUBLIC_IP>
```

Ubuntu फायरवॉल अपडेट करा:
```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save || sudo apt-get install -y iptables-persistent
```

Docker आणि Git इन्स्टॉल करा:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git docker.io docker-compose
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```
*(नोंद: नवीन ग्रुप परमिशनसाठी एकदा `exit` करून पुन्हा ssh करा)*

### पायरी ४: कोड क्लोन करून ॲप चालवणे
```bash
# कोड क्लोन करा
git clone <YOUR_GIT_REPO_URL> app
cd app

# Docker द्वारे ॲप सुरू करा
docker compose up -d --build
```
आता तुमचे ॲप `http://<YOUR_ORACLE_PUBLIC_IP>` वर चालू होईल!

---

## पर्याय २: Cloudflare सोबत डोमेन कनेक्ट करणे

### पायरी १: Cloudflare मध्ये डोमेन जोडणे
1. [Cloudflare Dashboard](https://dash.cloudflare.com/) वर जा.
2. **Add a Site** वर क्लिक करून तुमचे डोमेन (उदा. `mpscsarathi.com`) टाका.
3. Cloudflare ने दिलेले २ **Nameservers** तुमच्या डोमेन रजिस्ट्रारमध्ये (उदा. GoDaddy, Namecheap) जाऊन बदला.

### पायरी २: DNS Records सेट करणे
Cloudflare च्या **DNS** -> **Records** मध्ये जा आणि खालीलप्रमाणे नोंद करा:
- **Type**: `A`
- **Name**: `@` (किंवा तुमचे subdomain जसे `app`)
- **IPv4 address**: `<तुमचा_ORACLE_PUBLIC_IP>`
- **Proxy status**: **Proxied (नारिंगी मेघ चिन्ह चालू ठेवा)**
- **TTL**: Auto

### पायरी ३: SSL/TLS कॉन्फिगरेशन
1. Cloudflare मेनूमध्ये **SSL/TLS** वर जा.
2. **SSL/TLS encryption mode**:
   - जर VM वर फक्त पोर्ट 80 सुरू असेल तर **Flexible** निवडा.
   - (किंवा Nginx वर Let's Encrypt / Cloudflare Origin Certificate बसवले असेल तर **Full (Strict)** निवडा).
3. **Edge Certificates** मध्ये **Always Use HTTPS** चालू (Enable) करा.

---

## पर्याय ३: Cloudflare Tunnel (Ports न उघडता थेट सुरक्षित कनेक्शन - अत्यंत शिफारस केलेले!)

Cloudflare Tunnel (cloudflared) वापरल्यास Oracle Cloud चे कोणतेही पोर्ट्स (80 किंवा 443) इंटरनेटसाठी उघडावे लागत नाहीत. सर्व ट्रॅफिक क्लाउडफ्लेअरच्या खाजगी बोगद्यातून (Tunnel) सुरक्षितपणे वाहते.

### पायरी:
1. Cloudflare Dashboard -> **Zero Trust** -> **Networks** -> **Tunnels** वर जा.
2. **Create a Tunnel** निवडा (नाव द्या: `mpsc-tunnel`).
3. तेथे दिलेली Docker किंवा Debian/Ubuntu ची १ कमांड तुमच्या Oracle VM मध्ये पेस्ट करा.
4. **Public Hostnames** मध्ये:
   - Domain: `mpscsarathi.com`
   - Service Type: `HTTP`
   - URL: `localhost:80`
5. Save करा. तुमचे ॲप काही सेकंदांत थेट लाईव्ह आणि HTTPS सह सुरक्षित होईल!

---

## पर्याय ४: Cloudflare Pages (पर्यायी मोफत पद्धत)
हे ॲप्लिकेशन एक स्टॅटिक React + Vite ॲप असल्याने तुम्ही ते थेट **Cloudflare Pages** वर १ रुपयाही खर्च न करता अखंडपणे मोफत होस्ट करू शकता:
1. कोड **GitHub** वर पुश करा.
2. Cloudflare Dashboard -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git** निवडा.
3. Build Settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. **Save and Deploy** वर क्लिक करा.
