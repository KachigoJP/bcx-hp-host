# 🌱 Bàn Chân Xanh - Website

**Bàn Chân Xanh** là trang web chính thức của tổ chức phi lợi nhuận dành cho người Việt Nam ở Nhật Bản, tập trung vào các hoạt động ngoài trời và kết nối cộng đồng thông qua thiên nhiên.

## 📋 Tổng quan

Dự án này được xây dựng với [Next.js](https://nextjs.org) và React, mang đến trải nghiệm web hiện đại với giao diện thân thiện và tối ưu cho người dùng Việt Nam tại Nhật Bản.

### 🎯 Sứ mệnh
- Lan tỏa tình yêu thiên nhiên
- Kết nối cộng đồng người Việt tại Nhật Bản
- Tổ chức các hoạt động ngoài trời như hiking, camping và workshop

### 🚀 Tính năng chính
- **Trang chủ**: Giới thiệu tổ chức và các hoạt động
- **Sự kiện**: Thông tin chi tiết về hiking, camping, workshop
- **Tin tức**: Cập nhật hoạt động và thông báo mới nhất
- **Liên hệ**: Thông tin liên hệ và cách tham gia
- **Đa ngôn ngữ**: Hỗ trợ tiếng Việt (có thể mở rộng)

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: SCSS, Bootstrap 5, Material-UI
- **State Management**: Redux Toolkit
- **Animation**: React Awesome Reveal, Animate.css
- **UI Components**: React Bootstrap, Reactstrap
- **Media**: React Player, PhotoSwipe Gallery
- **Internationalization**: i18next
- **Deployment**: Docker, Google Cloud Platform

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 22.13.1+
- npm hoặc yarn
- Docker (tùy chọn)

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Các script khác
```bash
# Build production
npm run build

# Start production server
npm start

# Linting
npm run lint

# Type checking
npm run typecheck
```

## 🐳 Docker

### Development
```bash
# Build development image
docker build -f Dockerfile.dev -t bcx-hp-host:dev .

# Run with docker-compose
docker-compose up
```

### Production
```bash
# Build production image
docker build -f Dockerfile.prod -t bcx-hp-host:prod .

# Push to Google Cloud Registry
docker build -f Dockerfile.dev -t us-central1-docker.pkg.dev/banchanxanh/development/bcx-hp-host:latest
docker push gcr.io/banchanxanh/bcx-hp-host:latest
docker push us-central1-docker.pkg.dev/banchanxanh/development/bcx-hp-host:latest
```

## 📁 Cấu trúc dự án

```
bcx-hp-host/
├── src/                    # Source code
│   ├── components/         # React components
│   ├── pages/             # Next.js pages
│   ├── styles/            # SCSS styles
│   └── utils/             # Utility functions
├── public/                # Static assets
├── Dockerfile.dev         # Development Dockerfile
├── Dockerfile.prod        # Production Dockerfile
├── docker-compose.yaml    # Docker Compose configuration
└── package.json           # Dependencies and scripts
```

## 🎨 UI/UX Design

- **Phong cách**: Hiện đại, tối giản, thân thiện với thiên nhiên
- **Màu sắc**: Tông màu xanh lá, gợi nhớ về thiên nhiên
- **Typography**: Font chữ dễ đọc, phù hợp với nội dung tiếng Việt
- **Responsive**: Tối ưu cho mọi thiết bị từ mobile đến desktop

## 📝 Các trang chính

- **Trang chủ**: Hero section, giới thiệu, hoạt động chính, thành tựu
- **Sự kiện**: 
  - Hiking (Leo núi) 🏔️
  - Camping (Cắm trại) ⛺
  - Workshop 🎨
- **Tin tức**: Cập nhật hoạt động và thông báo
- **Liên hệ**: Thông tin liên hệ và đăng ký tham gia
- **Điều khoản**: Terms of Service và Privacy Policy

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp từ cộng đồng! Vui lòng:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📞 Liên hệ

- **Email**: [Thông tin liên hệ]
- **Facebook**: [Link Facebook group]
- **Instagram**: [Link Instagram]

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

---

**Bàn Chân Xanh** - *"Kết nối con người – Gắn bó thiên nhiên"* 🌱
