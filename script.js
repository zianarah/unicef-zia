/* Script UNICEF Indonesia versi Zia - semua class dan id berawalan zianarah_ */
(function () {
  'use strict';

  /* ===== GANTI ALAMAT EMAIL INI dengan email pemilik website (kamu) ===== */
  var zianarah_email_pemilik = 'zihanzianara@gmail.com';

  function zianarah_simpan(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function zianarah_ambil(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function zianarah_semua(sel, akar) { return Array.prototype.slice.call((akar || document).querySelectorAll(sel)); }
  var zianarah_html = document.documentElement;

  /* ----- tema siang / malam ----- */
  var zianarah_tombol_tema = document.getElementById('zianarah_tombol_tema');
  function zianarah_terapkan_tema(t) {
    if (t === 'malam') { zianarah_html.setAttribute('data-tema', 'malam'); } else { zianarah_html.removeAttribute('data-tema'); }
    if (zianarah_tombol_tema) {
      zianarah_tombol_tema.textContent = t === 'malam' ? '☀️' : '🌙';
      zianarah_tombol_tema.setAttribute('aria-pressed', t === 'malam' ? 'true' : 'false');
    }
  }
  zianarah_terapkan_tema(zianarah_ambil('zianarah_tema') || 'siang');
  if (zianarah_tombol_tema) {
    zianarah_tombol_tema.addEventListener('click', function () {
      var baru = zianarah_html.getAttribute('data-tema') === 'malam' ? 'siang' : 'malam';
      zianarah_terapkan_tema(baru); zianarah_simpan('zianarah_tema', baru);
    });
  }

  /* ----- bahasa ID / EN (mengganti teks yang punya atribut data-en) ----- */
  var zianarah_tombol_bahasa = document.getElementById('zianarah_tombol_bahasa');
  var zianarah_teks_bahasa = zianarah_semua('[data-en]');
  zianarah_teks_bahasa.forEach(function (el) { el.setAttribute('data-id', el.textContent); });
  var zianarah_ph = zianarah_semua('[data-en-ph]');
  zianarah_ph.forEach(function (el) { el.setAttribute('data-id-ph', el.getAttribute('placeholder')); });
  function zianarah_terapkan_bahasa(b) {
    zianarah_ph.forEach(function (el) { el.setAttribute('placeholder', el.getAttribute(b === 'en' ? 'data-en-ph' : 'data-id-ph')); });
    document.documentElement.setAttribute('lang', b);
    zianarah_teks_bahasa.forEach(function (el) { el.textContent = el.getAttribute(b === 'en' ? 'data-en' : 'data-id'); });
    zianarah_html.setAttribute('lang', b === 'en' ? 'en' : 'id');
    if (zianarah_tombol_bahasa) { zianarah_tombol_bahasa.textContent = b === 'en' ? 'English' : 'Bahasa Indonesia'; }
  }
  var zianarah_bahasa_kini = zianarah_ambil('zianarah_bahasa') || 'id';
  if (zianarah_bahasa_kini === 'en') { zianarah_terapkan_bahasa('en'); }
  var zianarah_daftar_bahasa = document.getElementById('zianarah_daftar_bahasa');
  function zianarah_tandai_bahasa() {
    if (!zianarah_daftar_bahasa) { return; }
    zianarah_semua('#zianarah_daftar_bahasa button').forEach(function (t) {
      t.classList.toggle('zianarah_terpilih', t.getAttribute('data-bahasa') === zianarah_bahasa_kini);
    });
  }
  function zianarah_tutup_bahasa() {
    if (!zianarah_daftar_bahasa) { return; }
    zianarah_daftar_bahasa.hidden = true; zianarah_tombol_bahasa.setAttribute('aria-expanded', 'false');
  }
  zianarah_tandai_bahasa();
  if (zianarah_tombol_bahasa && zianarah_daftar_bahasa) {
    zianarah_tombol_bahasa.addEventListener('click', function (e) {
      e.stopPropagation();
      var buka = zianarah_daftar_bahasa.hidden;
      zianarah_daftar_bahasa.hidden = !buka; zianarah_tombol_bahasa.setAttribute('aria-expanded', buka ? 'true' : 'false');
    });
    zianarah_semua('#zianarah_daftar_bahasa button').forEach(function (t) {
      t.addEventListener('click', function () {
        zianarah_bahasa_kini = t.getAttribute('data-bahasa');
        zianarah_terapkan_bahasa(zianarah_bahasa_kini); zianarah_simpan('zianarah_bahasa', zianarah_bahasa_kini);
        zianarah_tandai_bahasa(); zianarah_tutup_bahasa(); zianarah_tombol_bahasa.focus();
      });
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.zianarah_pilih_bahasa')) { zianarah_tutup_bahasa(); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { zianarah_tutup_bahasa(); } });
  }


  /* ----- menu tiga garis (laci kiri) ----- */
  var zianarah_t3 = document.getElementById('zianarah_tombol_garis3');
  var zianarah_laci = document.getElementById('zianarah_laci');
  var zianarah_latar = document.getElementById('zianarah_laci_latar');
  function zianarah_laci_set(buka) {
    if (!zianarah_laci) { return; }
    zianarah_laci.classList.toggle('zianarah_buka_laci', buka);
    zianarah_laci.setAttribute('aria-hidden', buka ? 'false' : 'true');
    zianarah_t3.setAttribute('aria-expanded', buka ? 'true' : 'false');
    if (buka) { zianarah_latar.hidden = false; requestAnimationFrame(function () { zianarah_latar.classList.add('zianarah_tampil'); }); }
    else { zianarah_latar.classList.remove('zianarah_tampil'); setTimeout(function () { if (!zianarah_laci.classList.contains('zianarah_buka_laci')) { zianarah_latar.hidden = true; } }, 300); }
  }
  if (zianarah_t3 && zianarah_laci) {
    zianarah_t3.addEventListener('click', function () { zianarah_laci_set(true); });
    document.getElementById('zianarah_laci_tutup').addEventListener('click', function () { zianarah_laci_set(false); });
    zianarah_latar.addEventListener('click', function () { zianarah_laci_set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { zianarah_laci_set(false); } });
    zianarah_semua('#zianarah_laci a').forEach(function (a) { a.addEventListener('click', function () { zianarah_laci_set(false); }); });
  }

  /* ----- menu mobile dan submenu ----- */
  var zianarah_tombol_menu = document.getElementById('zianarah_tombol_menu');
  var zianarah_bar_menu = document.getElementById('zianarah_menu_bar');
  if (zianarah_tombol_menu && zianarah_bar_menu) {
    zianarah_tombol_menu.addEventListener('click', function () {
      var buka = zianarah_bar_menu.classList.toggle('zianarah_buka');
      zianarah_tombol_menu.setAttribute('aria-expanded', buka ? 'true' : 'false');
    });
  }
  zianarah_semua('.zianarah_pemicu_submenu').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var item = btn.parentNode;
      var buka = item.classList.toggle('zianarah_buka');
      btn.setAttribute('aria-expanded', buka ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function () {
    zianarah_semua('.zianarah_menu_item.zianarah_buka').forEach(function (i) { i.classList.remove('zianarah_buka'); });
  });
  zianarah_semua('.zianarah_submenu a').forEach(function (a) {
    a.addEventListener('click', function () { if (zianarah_bar_menu) { zianarah_bar_menu.classList.remove('zianarah_buka'); } });
  });

  /* ----- header mengecil, tombol ke atas ----- */
  var zianarah_header = document.getElementById('zianarah_header');
  var zianarah_ke_atas = document.getElementById('zianarah_ke_atas');
  function zianarah_gulir() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    if (zianarah_header) { zianarah_header.classList.toggle('zianarah_kecil', y > 40); }
    if (zianarah_ke_atas) { zianarah_ke_atas.classList.toggle('zianarah_tampil', y > 500); }
  }
  window.addEventListener('scroll', zianarah_gulir, { passive: true }); zianarah_gulir();
  if (zianarah_ke_atas) { zianarah_ke_atas.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); }); }

  /* ----- animasi muncul saat scroll + penghitung angka ----- */
  function zianarah_hitung(el) {
    var target = parseInt(el.getAttribute('data-target'), 10), mulai = null, dur = 1400;
    function langkah(t) {
      if (mulai === null) { mulai = t; }
      var p = Math.min((t - mulai) / dur, 1);
      el.textContent = Math.round(target * p).toString();
      if (p < 1) { requestAnimationFrame(langkah); }
    }
    requestAnimationFrame(langkah);
  }
  if ('IntersectionObserver' in window) {
    var zianarah_pengamat = new IntersectionObserver(function (daftar) {
      daftar.forEach(function (d) {
        if (d.isIntersecting) {
          d.target.classList.add('zianarah_terlihat');
          zianarah_semua('.zianarah_angka[data-target]', d.target).forEach(function (a) { if (!a.getAttribute('data-jalan')) { a.setAttribute('data-jalan', '1'); zianarah_hitung(a); } });
          zianarah_pengamat.unobserve(d.target);
        }
      });
    }, { threshold: 0.12 });
    zianarah_semua('.zianarah_muncul').forEach(function (el) { zianarah_pengamat.observe(el); });
  } else {
    zianarah_semua('.zianarah_muncul').forEach(function (el) { el.classList.add('zianarah_terlihat'); });
    zianarah_semua('.zianarah_angka[data-target]').forEach(function (a) { a.textContent = a.getAttribute('data-target'); });
  }

  /* ----- placeholder jika gambar belum ada di folder img/ ----- */
  function zianarah_gambar_gagal(img) {
    var bungkus = img.closest('.zianarah_foto_bungkus');
    if (bungkus) { bungkus.classList.add('zianarah_foto_kosong'); }
    var logo = img.closest('.zianarah_logo');
    if (logo) {
      img.style.display = 'none';
      var teks = logo.querySelector('.zianarah_logo_teks');
      if (teks) { teks.classList.add('zianarah_tampil'); }
    }
  }
  zianarah_semua('img.zianarah_foto, img.zianarah_logo_gambar').forEach(function (img) {
    img.addEventListener('error', function () { zianarah_gambar_gagal(img); });
    if (img.complete && img.naturalWidth === 0) { zianarah_gambar_gagal(img); }
  });

  /* ----- filter kategori + pencarian (halaman penelitian, cerita, FAQ) ----- */
  zianarah_semua('[data-zianarah-filter]').forEach(function (area) {
    var chips = zianarah_semua('.zianarah_chip', area);
    var cari = area.querySelector('.zianarah_cari');
    var item = zianarah_semua('[data-kategori]', area).filter(function (el) { return !el.classList.contains('zianarah_chip'); });
    var jumlah = area.querySelector('.zianarah_jumlah_angka');
    var kosong = area.querySelector('.zianarah_kosong');
    var kategori = 'semua';
    function terapkan() {
      var q = cari ? cari.value.trim().toLowerCase() : '', n = 0;
      item.forEach(function (el) {
        var cocokK = kategori === 'semua' || el.getAttribute('data-kategori') === kategori;
        var cocokQ = !q || el.textContent.toLowerCase().indexOf(q) !== -1;
        var tampil = cocokK && cocokQ;
        el.classList.toggle('zianarah_sembunyi', !tampil);
        if (tampil) { n++; }
      });
      if (jumlah) { jumlah.textContent = n; }
      if (kosong) { kosong.classList.toggle('zianarah_tampil', n === 0); }
    }
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (x) { x.classList.remove('zianarah_aktif'); });
        c.classList.add('zianarah_aktif'); kategori = c.getAttribute('data-nilai'); terapkan();
      });
    });
    if (cari) { cari.addEventListener('input', terapkan); }
    terapkan();
  });

  /* ----- akordeon FAQ ----- */
  zianarah_semua('.zianarah_akordeon_tombol').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.parentNode, isi = item.querySelector('.zianarah_akordeon_isi');
      var buka = item.classList.toggle('zianarah_buka');
      btn.setAttribute('aria-expanded', buka ? 'true' : 'false');
      isi.style.maxHeight = buka ? isi.scrollHeight + 'px' : '0px';
    });
  });

  /* ----- bintang saat tombol donasi diklik ----- */
  function zianarah_bintang(e) {
    var b = e.currentTarget.getBoundingClientRect();
    for (var i = 0; i < 8; i++) {
      var s = document.createElement('span');
      s.className = 'zianarah_bintang'; s.textContent = '⭐';
      s.style.left = (b.left + b.width / 2) + 'px'; s.style.top = (b.top + b.height / 2) + 'px';
      document.body.appendChild(s);
      (function (s, i) {
        setTimeout(function () {
          var a = i * 45 * Math.PI / 180;
          s.style.transform = 'translate(' + Math.round(Math.cos(a) * 70) + 'px,' + Math.round(Math.sin(a) * 70 - 20) + 'px) rotate(180deg)';
          s.style.opacity = '0';
        }, 20);
        setTimeout(function () { s.remove(); }, 1000);
      })(s, i);
    }
  }
  zianarah_semua('.zianarah_donasi').forEach(function (a) { a.addEventListener('click', zianarah_bintang); });

  /* ----- panel pengaturan cookie ----- */
  var zianarah_panel = document.getElementById('zianarah_panel_cookie');
  var zianarah_buka_cookie = document.getElementById('zianarah_buka_cookie');
  var zianarah_tutup_cookie = document.getElementById('zianarah_tutup_cookie');
  if (zianarah_panel && zianarah_buka_cookie) {
    zianarah_buka_cookie.addEventListener('click', function () { zianarah_panel.classList.toggle('zianarah_tampil'); });
  }
  if (zianarah_panel && zianarah_tutup_cookie) {
    zianarah_tutup_cookie.addEventListener('click', function () { zianarah_panel.classList.remove('zianarah_tampil'); });
  }

  /* ----- form kontak: validasi + pesan sukses + kirim lewat email ----- */
  var zianarah_form = document.getElementById('zianarah_form_kontak');
  if (zianarah_form) {
    var f = zianarah_form.elements;
    var pesan_el = document.getElementById('zianarah_pesan');
    var hitung = document.getElementById('zianarah_hitung_pesan');
    var galat = function (nama, teks) {
      var kolom = document.getElementById('zianarah_kolom_' + nama);
      kolom.classList.toggle('zianarah_salah', !!teks);
      kolom.querySelector('.zianarah_galat').textContent = teks || '';
      return !teks;
    };
    var cek = {
      nama: function () { return galat('nama', f.nama.value.trim().length < 3 ? 'Nama minimal 3 huruf.' : ''); },
      email: function () { return galat('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim()) ? '' : 'Isi email dengan format yang benar, misalnya nama@email.com.'); },
      subjek: function () { return galat('subjek', f.subjek.value ? '' : 'Pilih topik pesan.'); },
      pesan: function () { return galat('pesan', f.pesan.value.trim().length < 10 ? 'Pesan minimal 10 karakter.' : ''); }
    };
    ['nama', 'email', 'subjek', 'pesan'].forEach(function (n) {
      f[n].addEventListener('input', function () { if (document.getElementById('zianarah_kolom_' + n).classList.contains('zianarah_salah')) { cek[n](); } });
    });
    if (pesan_el && hitung) { pesan_el.addEventListener('input', function () { hitung.textContent = pesan_el.value.length + ' / 500'; }); }
    zianarah_form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      ['nama', 'email', 'subjek', 'pesan'].forEach(function (n) { if (!cek[n]()) { ok = false; } });
      if (!ok) { var pertama = zianarah_form.querySelector('.zianarah_salah input, .zianarah_salah select, .zianarah_salah textarea'); if (pertama) { pertama.focus(); } return; }
      var kotak = document.getElementById('zianarah_sukses_kirim');
      document.getElementById('zianarah_sukses_nama').textContent = f.nama.value.trim();
      kotak.classList.add('zianarah_tampil');
      var tautan = 'mailto:' + zianarah_email_pemilik + '?subject=' + encodeURIComponent('[' + f.subjek.value + '] Pesan dari ' + f.nama.value.trim()) +
        '&body=' + encodeURIComponent(f.pesan.value.trim() + '\n\nDari: ' + f.nama.value.trim() + ' (' + f.email.value.trim() + ')');
      document.getElementById('zianarah_tautan_email').setAttribute('href', tautan);
      kotak.scrollIntoView({ behavior: 'smooth', block: 'center' });
      zianarah_form.reset(); if (hitung) { hitung.textContent = '0 / 500'; }
    });
  }

  var zianarah_tahun = document.getElementById('zianarah_tahun');
  if (zianarah_tahun) { zianarah_tahun.textContent = new Date().getFullYear(); }
})();
