export default function Head() {
  const hero = "https://images.unsplash.com/photo-1766227736416-7e7aa3404380?auto=format&fit=crop&fm=jpg&q=85&w=2000";
  return (
    <>
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      <link rel="preload" as="image" href={hero} fetchPriority="high" />
    </>
  );
}
