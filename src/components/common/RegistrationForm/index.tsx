import React from 'react';

interface RegistrationFormProps {
  activityType: 'camping' | 'hiking' | 'workshop';
  title: string;
  description: string;
  emoji: string;
  activityOptions: Array<{
    value: string;
    label: string;
    emoji: string;
  }>;
  placeholder?: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  activityType,
  title,
  description,
  emoji,
  activityOptions,
  placeholder = "Chia sẻ kinh nghiệm của bạn, yêu cầu đặc biệt về thức ăn, chỗ ở, hoặc bất kỳ điều gì khác..."
}) => {
  return (
    <section className="wpo-join-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="wpo-section-title text-center">
              <span>Tham gia ngay</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10 col-md-12 col-12 mx-auto">
            <div className="wpo-join-form" style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div className="text-center mb-4">
                <h3 style={{
                  color: '#2c3e50',
                  fontWeight: '600',
                  marginBottom: '10px',
                  fontSize: '28px'
                }}>
                  {emoji} Đăng Ký Tham Gia {activityType === 'camping' ? 'Camping' : activityType === 'hiking' ? 'Hiking' : 'Workshop'}
                </h3>
                <p style={{
                  color: '#6c757d',
                  fontSize: '16px',
                  marginBottom: '0'
                }}>
                  Hãy điền thông tin để chúng tôi có thể hỗ trợ bạn tốt nhất
                </p>
              </div>

              <form>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '500',
                        color: '#495057',
                        fontSize: '14px'
                      }}>
                        Họ và tên <span style={{ color: '#e74c3c' }}>*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập họ và tên của bạn"
                        required
                        style={{
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          background: '#fff'
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '500',
                        color: '#495057',
                        fontSize: '14px'
                      }}>
                        Email <span style={{ color: '#e74c3c' }}>*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@email.com"
                        required
                        style={{
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          background: '#fff'
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '500',
                        color: '#495057',
                        fontSize: '14px'
                      }}>
                        Số điện thoại <span style={{ color: '#e74c3c' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="0901234567"
                        required
                        style={{
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          background: '#fff'
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '500',
                        color: '#495057',
                        fontSize: '14px'
                      }}>
                        Loại {activityType === 'camping' ? 'camping' : activityType === 'hiking' ? 'hiking' : 'workshop'} <span style={{ color: '#e74c3c' }}>*</span>
                      </label>
                      <select
                        className="form-control"
                        required
                        style={{
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          background: '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="">-- Chọn loại {activityType === 'camping' ? 'camping' : activityType === 'hiking' ? 'hiking' : 'workshop'} --</option>
                        {activityOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.emoji} {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '500',
                        color: '#495057',
                        fontSize: '14px'
                      }}>
                        Số người tham gia
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="1"
                        min="1"
                        max="20"
                        style={{
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          background: '#fff'
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-group" style={{ marginBottom: '25px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '500',
                        color: '#495057',
                        fontSize: '14px'
                      }}>
                        Ngày tham gia mong muốn
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        style={{
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          background: '#fff',
                          cursor: 'pointer'
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group" style={{ marginBottom: '30px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '500',
                        color: '#495057',
                        fontSize: '14px'
                      }}>
                        Kinh nghiệm {activityType === 'camping' ? 'camping' : activityType === 'hiking' ? 'hiking' : 'workshop'} và yêu cầu đặc biệt
                      </label>
                      <textarea
                        className="form-control"
                        rows={4}
                        placeholder={placeholder}
                        style={{
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          background: '#fff',
                          resize: 'vertical'
                        }}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group text-center">
                      <button
                        type="submit"
                        className="theme-btn"
                        style={{
                          background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                          border: 'none',
                          borderRadius: '50px',
                          padding: '15px 40px',
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#fff',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 8px 25px rgba(46, 204, 113, 0.3)',
                          textTransform: 'none',
                          letterSpacing: '0.5px'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 12px 35px rgba(46, 204, 113, 0.4)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 8px 25px rgba(46, 204, 113, 0.3)';
                        }}
                      >
                        🚀 Đăng Ký Tham Gia Ngay
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="text-center mt-4">
                <p style={{
                  color: '#6c757d',
                  fontSize: '14px',
                  marginBottom: '0'
                }}>
                  <i className="ti-shield" style={{ marginRight: '5px' }}></i>
                  Thông tin của bạn được bảo mật tuyệt đối
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
