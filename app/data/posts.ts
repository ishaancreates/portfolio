/**
 * Journal entries.
 *
 * To add the article body, fill `body` with blocks, e.g.
 *   { type: 'p', text: '…' }, { type: 'h2', text: '…' },
 *   { type: 'ul', items: ['…'] }, { type: 'quote', text: '…' }, { type: 'code', text: '…' }
 * `date` and `readingMinutes` are optional and simply hidden when missing.
 */

export type PostCategory = 'Notes'

export type Block =
  | { type: 'p' | 'h2' | 'quote' | 'code'; text: string }
  | { type: 'ul'; items: string[] }

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  /** ISO date, e.g. 2026-11-20 */
  date?: string
  readingMinutes?: number
  /** Original publication, shown as a "Read on Medium" link. */
  source?: { label: string; href: string }
  body?: Block[]
}

export const postCategories: PostCategory[] = ['Notes']

export const posts: Post[] = [
  {
    slug: 'ad-free-on-all-devices',
    title: 'How I went ad-free on all devices: TV, phones and laptops at home',
    excerpt: 'Blocking ads on every device at home, so the only thing selling me stuff is my own impulse control.',
    category: 'Notes',
    date: '2026-06-02',
    readingMinutes: 4,
    source: {
      label: 'Medium',
      href: 'https://medium.com/@ishaanmaybe/how-i-went-ad-free-on-all-devices-tv-phones-laptops-at-home-3271d15be29c',
    },
    body: [
      {
        "type": "p",
        "text": "Hello devs,"
      },
      {
        "type": "p",
        "text": "Today I’m gonna tell how i blocked ads from everywhere on devices connected to my home router."
      },
      {
        "type": "p",
        "text": "This summer vacation while surfing my smart TV i came across a lot of ads, even premium subscriptions of Hotstar and Prime Video also shows ads, and i dont think people would really pay for youtube premium these days."
      },
      {
        "type": "p",
        "text": "So to get rid of this ads-everywhere problem i searched the internet and found about PiHole. An opensource software which allows you to block ads on all websites network-wide. What it does is that it filters every request through itself and just blocks the DNS of ads."
      },
      {
        "type": "p",
        "text": "How that normally works is: the device asks the DNS server directly and gets the address back. But when we bring PiHole in the picture what it does is, it redirects the device request to itself and filters the dns requests."
      },
      {
        "type": "h2",
        "text": "Now setting up Pi-Hole"
      },
      {
        "type": "p",
        "text": "Although the most convenient and best practice to use pihole is by using a raspberry pi as it stays on all the time and will keep the piHole running all the time so blocking thing happens all the time but since I’m broke (else i’d have paid for youtube premium) I did the whole setup on Docker for which the docker-compose.yml file looked something like this"
      },
      {
        "type": "code",
        "text": "services:\n  pihole:\n    container_name: pihole\n    image: pihole/pihole:latest\n    ports:\n      # DNS Ports\n     - \"53:53/tcp\"\n     - \"53:53/udp\"\n     - \"8080:80/tcp\"\n    environment:\n      TZ: 'Asia/Kolkata'\n      FTLCONF_webserver_api_password: 'YOUR_PASSWORD'\n      FTLCONF_dns_listeningMode: 'all'\n    volumes:\n      - ./etc-pihole:/etc/pihole\n      - ./etc-dnsmasq.d:/etc/dnsmasq.d\n    cap_add:\n      - NET_ADMIN\n      - SYS_TIME\n      - SYS_NICE\n    restart: unless-stopped"
      },
      {
        "type": "p",
        "text": "here i made a container named pihole and downloaded its image and then assigned ports to it"
      },
      {
        "type": "p",
        "text": "The part where I struggled the most is that port 53 is being used by the OS to change DNS to IP by running a program called systemd-resolved. I’ll tell you the fix to all of that one by one."
      },
      {
        "type": "h2",
        "text": "1. Permission denied on the Docker socket"
      },
      {
        "type": "p",
        "text": "First issue that would come when you run the docker container by"
      },
      {
        "type": "code",
        "text": "docker compose up -d"
      },
      {
        "type": "p",
        "text": "it will say: permission denied while trying to connect to the Docker daemon socket. To fix that run"
      },
      {
        "type": "code",
        "text": "sudo usermod -aG docker $USER\nnewgrp docker"
      },
      {
        "type": "p",
        "text": "this first command modifies the user and adds user (i.e. you) to the docker group. here usermod stands for user modification, -a means append, G is for group and $USER tells that user is to be appended. Have a question why? Because docker protects /var/run/docker.sock which is the socket used to talk to Docker daemon. So after adding USER -> you to the socket, docker trusts you and now allows you to run it."
      },
      {
        "type": "p",
        "text": "Now for newgrp docker: normally group changes take effect only after logout or login but when you run this command it instantly refreshes your permissions."
      },
      {
        "type": "h2",
        "text": "2. Port 53 already in use"
      },
      {
        "type": "p",
        "text": "Now the issue which took all my time: bind: address already in use 0.0.0.0:53, which means port 53 is already in use. To find what is using the port i ran"
      },
      {
        "type": "code",
        "text": "sudo lsof -i :53"
      },
      {
        "type": "p",
        "text": "which tells what is using the port 53 which i found as systemd-resolved. So in ubuntu the port 53 is used to convert the dns to ip addresses."
      },
      {
        "type": "p",
        "text": "To verify if pi-hole even runs or not i ran it on a different port and changed the port in the yml files to"
      },
      {
        "type": "code",
        "text": "ports:\n - \"8053:53/tcp\"\n - \"8053:53/udp\"\n - \"8080:80/tcp\""
      },
      {
        "type": "p",
        "text": "which maps host 8053 to container internal 53. This works locally such that i can block ads but only on my pc, but i didnt want that, i wanted ad free world for everyone at home."
      },
      {
        "type": "p",
        "text": "I then changed the ports to what it was before, “53:53”. And at first what i did was i stopped the systemd-resolved using"
      },
      {
        "type": "code",
        "text": "sudo systemctl stop systemd-resolved"
      },
      {
        "type": "p",
        "text": "after which the container started, but my internet stopped. i couldnt access any website on my laptop, it showed network error everytime i tried to connect to a website. The problem wasn’t the network connection itself. DNS resolution had disappeared because Ubuntu depends on systemd-resolved."
      },
      {
        "type": "h2",
        "text": "The proper solution"
      },
      {
        "type": "p",
        "text": "Instead of stopping the service completely, I edited:"
      },
      {
        "type": "code",
        "text": "sudo nano /etc/systemd/resolved.conf"
      },
      {
        "type": "p",
        "text": "and changed"
      },
      {
        "type": "code",
        "text": "#DNSStubListener=yes"
      },
      {
        "type": "p",
        "text": "to"
      },
      {
        "type": "code",
        "text": "DNSStubListener=no"
      },
      {
        "type": "p",
        "text": "then restarted it"
      },
      {
        "type": "code",
        "text": "sudo systemctl restart systemd-resolved"
      },
      {
        "type": "p",
        "text": "This keeps Ubuntu’s DNS functionality while freeing port 53 for Pi-hole."
      },
      {
        "type": "p",
        "text": "Therefore after freeing port 53, i started the docker container again"
      },
      {
        "type": "code",
        "text": "docker compose down\ndocker compose up -d"
      },
      {
        "type": "p",
        "text": "and this time the container started successfully and the dashboard was available on http://localhost:8080/admin"
      },
      {
        "type": "h2",
        "text": "Now connecting my phone"
      },
      {
        "type": "p",
        "text": "First connect your home wifi, then open wifi settings and set IP settings to Static. Keep the ip address as it is, for example Phone IP: 192.168.1.32. PiHole works on the LAN ip address of the machine running it, which you can find by running the command"
      },
      {
        "type": "code",
        "text": "hostname -I"
      },
      {
        "type": "p",
        "text": "for me it was: 192.168.1.34. So for DNS 1 put 192.168.1.34, and make sure to do the same for DNS 2, because if DNS 2 is Google’s DNS, ad requests that Pi-hole would block might fall through to Google’s DNS as a fallback, bypassing Pi-hole entirely. So if it isnt changed ads still show up. Therefore put DNS 2 as 192.168.1.34 too."
      },
      {
        "type": "p",
        "text": "BOOM IT WORKS. You can open youtube and watch endlessly, it wont show any ads. You can change the dns for your smart TV too."
      },
      {
        "type": "quote",
        "text": "BTW THIS THING ONLY WORKS TILL YOUR LAPTOP IS ON"
      }
    ],
  },
]

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
