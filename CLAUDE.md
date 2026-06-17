# CLAUDE.md - Hướng dẫn cho developer làm việc với Claude

## Tổng quan dự án

Website của cộng đồng **Bàn Chân Xanh** (Nhật Bản), xây dựng bằng **Next.js (Pages Router)** + **TypeScript**.
Tính năng chính hiện tại: hệ thống đăng ký sự kiện **TRAO 2026**.

## Tech stack

- **Framework:** Next.js 15 (Pages Router), TypeScript
- **Styling:** Bootstrap + inline styles
- **Backend:** Next.js API Routes
- **Database:** Google Sheets (qua googleapis)
- **File storage:** Google Drive (ảnh chuyển khoản)
- **Email:** nodemailer + Gmail App Password

## Biến môi trường cần thiết (.env.local)

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
GOOGLE_DRIVE_FOLDER_ID=
GOOGLE_EMAIL=
GMAIL_APP_PASSWORD=
```

## Cấu trúc TRAO 2026

### Pages

| Route | File | Mô tả |
|---|---|---|
| `/trao-2026` | `src/pages/trao-2026.tsx` | Trang giới thiệu sự kiện |
| `/trao-2026-form-dang-ky` | `src/pages/trao-2026-form-dang-ky.tsx` | Form đăng ký thường (6 bước) |
| `/trao-2026-form-dang-ky-ctv-ntt` | `src/pages/trao-2026-form-dang-ky-ctv-ntt.tsx` | Form đăng ký CTV/NTT (6 bước, phí khác) |
| `/trao-2026-tra-cuu` | `src/pages/trao-2026-tra-cuu.tsx` | Tra cứu + chỉnh sửa thông tin |
| `/trao-2026-ao` | `src/pages/trao-2026-ao.tsx` | Thông tin áo sự kiện |
| `/trao-2026-cabin` | `src/pages/trao-2026-cabin.tsx` | Danh sách cabin (realtime) |
| `/trao-2026-san-pham` | `src/pages/trao-2026-san-pham.tsx` | Giới thiệu sản phẩm gây quỹ |

### API Routes

| Route | File | Chức năng |
|---|---|---|
| `/api/trao-2026-reserve` | `trao-2026-reserve.ts` | Tạo mã đặt chỗ tạm (trước khi submit) |
| `/api/trao-2026-register` | `trao-2026-register.ts` | Lưu đăng ký vào Google Sheet + gửi email |
| `/api/trao-2026-register-ctv-ntt` | `trao-2026-register-ctv-ntt.ts` | Lưu đăng ký CTV/NTT |
| `/api/trao-2026-lookup` | `trao-2026-lookup.ts` | Tra cứu theo mã + mật khẩu |
| `/api/trao-2026-update` | `trao-2026-update.ts` | Cập nhật áo/cabin |
| `/api/trao-2026-upload-receipt` | `trao-2026-upload-receipt.ts` | Upload ảnh chuyển khoản |
| `/api/trao-2026-sendmail` | `trao-2026-sendmail.ts` | Gửi lại email xác nhận |
| `/api/trao-2026-cabins` | `trao-2026-cabins.ts` | Lấy danh sách cabin + số người đã đăng ký |

### Form components (src/components/trao2026/)

- `Step1Form` - Thông tin cá nhân
- `Step2Form` - Hình thức đăng ký (cá nhân / nhóm)
- `Step3Form` - Phương tiện di chuyển
- `Step4PaymentForm` - Thanh toán + donation
- `Step5Form` - Sản phẩm + CTV
- `Step6Form` - Áo & cabin
- `constants.ts` - Phí, danh sách size áo, màu áo, sản phẩm
- `helpers.ts` - `calcFees()`, `calcProductFee()`, `fmtYen()`
- `types.ts` - TypeScript types cho tất cả các bước

## Google Sheet - cấu trúc cột (0-based index)

```
A(0)  CODE          - Mã đăng ký (BCXxxxxxx)
B(1)  TIMESTAMP     - Thời gian đăng ký
C(2)  NAME
D(3)  EMAIL
E(4)  GENDER
F(5)  AGE
G(6)  FACEBOOK
H(7)  PHONE
I(8)  EMERGENCY_PHONE
J(9)  EMERGENCY_REL
K(10) ADDRESS
L(11) BLOOD
M(12) REG_TYPE      - "Cá nhân" / "Nhóm/Gia đình"
N(13) NUM_PERSON
O(14) TRANSPORT     - "Xe bus BTC" / "Tự túc"
P(15) BUS_DEP       - "Tokyo" / "Nagoya" / "Osaka"
Q(16) FEE_EVENT
R(17) FEE_BUS
S(18) DONATION      - Quyên góp thiện nguyện
T(19) FEE_TOTAL
U(20) RECEIPT       - Link ảnh chuyển khoản (Google Drive)
V(21) FOOD_ALLERGY
W(22) PRODUCTS      - Chuỗi, vd: "Khăn Rằn x2, Túi Tò Te x1"
X(23) FEE_PRODUCT
Y(24) VOLUNTEER     - "Có" / "Không"
Z(25) VOLUNTEER_TEAMS
AA(26) NOTE
AB(27) STATUS       - "Chờ xác nhận" / "Chưa chuyển khoản" / "Đã xác nhận"
AC(28) REP_CODE     - Mã đại diện (dành cho dòng thành viên)
AD(29) ROLE         - "CTV" / "NTT" (chỉ form CTV/NTT)
AE(30) SHIRT_SIZE
AF(31) SHIRT_COLOR  - "Trắng" / "Xanh lá" / "Vàng chanh"
AG(32) CABIN        - Tên cabin đầy đủ (vd: "Nhóm A - Cabin 1")
AH(33) PASSWORD
AI(34) COUNT_ADULT
AJ(35) COUNT_CHILD
AK(36) COUNT_FREE
AL(37) EDIT_STATUS   - "Đã cập nhật" (ghi khi người dùng sửa áo/cabin qua tra-cuu)
AM(38) EDIT_AT       - Thời gian chỉnh sửa áo/cabin (JST, dòng đại diện)
```

- **Dòng đại diện (rep row):** có dữ liệu đầy đủ, cột AC(REP_CODE) trống
- **Dòng thành viên (member rows):** cột AC(REP_CODE) = mã đại diện, các cột phí để trống

## Logic phí

```
FEE_ADULT = 16,500 ¥  (tuổi > 12)
FEE_CHILD = 8,000 ¥   (6 <= tuổi <= 12)
Miễn phí              (khuyết tật hoặc tuổi < 6)

FEE_BUS_TOKYO = 7,000 ¥
FEE_BUS_OTHER = 9,000 ¥  (Nagoya, Osaka)

grandTotal = fee_total + fee_product + donation
needPayLater = payment_timing === "later" && grandTotal > 0
```

## Áo sự kiện - quy tắc size

- **Trắng:** không có XS, S
- **Xanh mint:** không có XS, S
- **Vàng chanh:** chỉ có XS, S
- **Tất cả màu:** có M, L, XL, 2XL (không có 3XL, 4XL)

## Sản phẩm gây quỹ

| Key | Tên | Giá |
|---|---|---|
| `khan_ran` | Khăn Rằn | 800 ¥ |
| `khan_tho_cam` | Khăn Thổ Cẩm | 1,300 ¥ |
| `tui_to_te` | Túi Tò Te | 1,200 ¥ |

## Quy tắc text

- Dùng `-` thay vì `—` trong text tiếng Việt

## Lệnh thường dùng

```bash
npm run dev       # Chạy dev server
npm run build     # Build production (bao gồm lint + typecheck)
npm run lint      # ESLint
npm run typecheck # tsc --noEmit
```

## Lưu ý khi sửa code

- Khi thêm/bớt cột Google Sheet: cập nhật **tất cả** các file liên quan:
  `trao-2026-register.ts`, `trao-2026-register-ctv-ntt.ts`, `trao-2026-lookup.ts`,
  `trao-2026-update.ts`, `trao-2026-upload-receipt.ts`, `trao-2026-cabins.ts`
- Logic đếm cabin đọc từ cột AG(32) của tất cả các dòng trong sheet
- Email xác nhận được gửi qua `src/lib/sendRegistrationEmail.ts` (đăng ký mới)
  và `src/pages/api/trao-2026-sendmail.ts` (gửi lại)
