Saya ingin mengubah default state dari Organization Chart.

### Requirement

Pada saat Organization Chart pertama kali dirender, **node dengan depth lebih dari 2 harus dalam kondisi collapsed/hidden secara default**.

Gunakan konsep depth berdasarkan root:

```text
Level 0 → Root
           Kepala Madrasah / Ketua Komite

Level 1 → Category / Department
           Administrasi & Operasional
           Wakabag & Koordinator
           Wali Kelas

Level 2+ → Personnel / descendant nodes
           Personel-personel di bawah category
```

### Default behavior

Pada initial load:

- Root nodes tetap visible.
- Category/parent nodes tetap visible.
- Descendant/personnel nodes pada level 2 dan seterusnya **tidak langsung ditampilkan**.
- Parent/category yang mempunyai hidden children harus menampilkan indikator bahwa masih terdapat child nodes di dalamnya.
- Gunakan existing `Buka` / expand control pada parent node untuk menampilkan children tersebut.

Dengan kata lain, tampilan awal seharusnya hanya memperlihatkan struktur utama:

```text
             ROOT
               │
     ┌─────────┼─────────┐
     │         │         │
   Admin    Wakabag   Wali Kelas
   [Buka]    [Buka]     [Buka]
```

Bukan langsung:

```text
             ROOT
               │
     ┌─────────┼─────────┐
     │         │         │
   Admin    Wakabag   Wali Kelas
     │         │         │
   person    person    person
   person    person    person
   person    person    person
```

### Expand behavior

Ketika user klik `Buka` pada sebuah parent/category:

1. Tampilkan direct children dari node tersebut.
2. Update connector/edge yang berkaitan.
3. Recalculate actual content bounds.
4. Jangan mengubah zoom secara otomatis.
5. Pertahankan posisi viewport sebisa mungkin agar node yang diklik tidak meloncat jauh.

Ketika ditutup kembali:

1. Sembunyikan descendants dari branch tersebut.
2. Recalculate content bounds.
3. Update pan boundaries.
4. Jangan reset seluruh posisi chart.

### Important

Implementasikan ini sebagai **collapsed state pada tree**, bukan sekadar CSS:

```css
display: none;
```

atau menyembunyikan DOM setelah seluruh tree selesai dihitung.

Hidden descendants **tidak boleh ikut diperhitungkan dalam layout/bounding box**.

Artinya jika children sedang collapsed:

```text
visibleNodes = hanya node yang expanded/visible
visibleEdges = hanya edge antar visible nodes
```

Layout engine harus menghitung posisi berdasarkan `visibleNodes`, bukan seluruh tree.

Ini penting agar saat initial load tidak muncul whitespace horizontal/vertical yang berasal dari hidden personnel nodes.

### Expand All / Collapse All

Jika toolbar memiliki:

- `Expand all`
- `Collapse all`

maka:

**Expand all**
→ tampilkan seluruh descendants.

**Collapse all**
→ kembali ke struktur utama/root + category nodes, sama seperti default initial state.

### Reset Position

`Reset posisi` hanya mengatur viewport/pan/zoom.

Jangan mengubah expanded/collapsed state ketika Reset Position diklik.

### Acceptance Criteria

Initial load:

```text
Root
 ├── Category A [Buka]
 ├── Category B [Buka]
 └── Category C [Buka]
```

Personnel/leaf nodes di bawah category tidak terlihat.

Setelah klik:

```text
Category A [Tutup]
 ├── Person 1
 ├── Person 2
 ├── Person 3
 └── Person 4
```

Hanya branch yang dipilih yang terbuka.

Pastikan juga:

- hidden nodes tidak mengambil space pada layout;
- hidden edges tidak dirender;
- chart bounds mengikuti visible nodes;
- pan boundary mengikuti visible content;
- membuka satu branch tidak otomatis membuka branch lain;
- zoom tidak berubah ketika expand/collapse;
- tidak ada layout jump yang berlebihan.

Sebelum implementasi, identifikasi terlebih dahulu bagaimana tree saat ini menentukan `expanded/collapsed`, `visibleNodes`, edges, dan layout dimensions. Gunakan mekanisme existing jika sudah tersedia daripada membuat state collapse kedua yang terpisah.