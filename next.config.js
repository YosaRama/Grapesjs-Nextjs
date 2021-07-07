module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/page",
        permanent: true,
      },
    ];
  },
};
