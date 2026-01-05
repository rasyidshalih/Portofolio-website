AOS.init({
    duration: 800,
    once: true
  });
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Abaikan link kosong atau javascript
      if (!href || href === '#' || href.startsWith('javascript')) {
        e.preventDefault();
        history.replaceState(null, '', location.pathname);
        return;
      }

      // Handle anchor scroll (#about, #contact, dll)
      if (href.startsWith('#')) {
        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
          history.replaceState(null, '', href);
        }
      }
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const button = document.getElementById("submitBtn");

  const defaultText = "Kirim";
  const sendingText = "Mengirim...";
  const successText = "Berhasil ✓";
  const errorText = "Gagal ✕";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // loading state
    button.disabled = true;
    button.innerText = sendingText;
    button.classList.remove("btn-success", "btn-danger");
    button.classList.add("btn-outline-custom");

    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xpqwbbbj", {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        // SUCCESS
        button.innerText = successText;
        button.classList.remove("btn-outline-custom");
        button.classList.add("btn-success");

        form.reset(); // 🔥 auto clear form
      } else {
        throw new Error("Form submit failed");
      }

    } catch (error) {
      // ERROR
      button.innerText = errorText;
      button.classList.remove("btn-outline-custom");
      button.classList.add("btn-danger");
    }

    // reset button after 3 seconds
    setTimeout(() => {
      button.disabled = false;
      button.innerText = defaultText;
      button.classList.remove("btn-success", "btn-danger");
      button.classList.add("btn-outline-custom");
    }, 3000);
  });
});
