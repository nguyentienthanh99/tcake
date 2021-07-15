var express = require('express');
var cors = require('cors');
var database = require('./database');
var databaseUser = require('./databaseUser');
const multer = require('multer')
var app = express();

app.use(cors('*'))


// --------------------------------- Bánh---------------------------
//Lấy bánh DONE
app.get('/listBanh',function(req,res){
    database.getAllBanh(function(resultQuery){
        res.json(resultQuery);
    })
});

//banh đã bán DONE
app.get('/listBanhDaBan',function(req,res){
    database.getAllBanhDaBan(function(resultQuery){
        res.json(resultQuery);
    })
});

//lấy chi tiết bánh DONE
app.get('/detailBanh',function(req,res){
    var MaBanh = req.query.MaBanh;
    database.getDetailBanh(MaBanh,function(resultQuery){
        res.json(resultQuery[0]);
    })
});

//lấy detail Số lượng bánh đã bán
app.get('/detailBanhDaBan',function(req,res){
    var MaBanh = req.query.MaBanh;
    database.getDetailBanhDaBan(MaBanh,function(resultQuery){
        res.json(resultQuery[0]);
    })
});

//Lấy bánh cùng loại
app.get('/listBanhCungLoai',function(req,res){
    var MaLoaiBanh = req.query.MaLoaiBanh;
    database.getBanhCungLoai(MaLoaiBanh,function(resultQuery){
        res.json(resultQuery);
    })
});

//Lấy bánh search
app.get('/listBanhSearch',function(req,res){
    var TenBanh = req.query.TenBanh;
    database.getBanhSearch(TenBanh,function(resultQuery){
        res.json(resultQuery);
    })
});

//lấy mã bánh max
app.get('/maBanhMax',function(req,res){
    database.MaBanhMax(function(resultQuery){
        res.json(resultQuery[0]);
    })
});

//Lấy list kích thước
app.get('/getListkichThuoc',function(req,res){
    database.getKichThuoc(function(resultQuery){
        res.json(resultQuery);
    })
});


//Thêm bánh
app.post('/themBanh',function(req,res){
    var MaBanh = req.query.MaBanh;
    var TenBanh = req.query.TenBanh;
    var MaLoaiBanh = req.query.MaLoaiBanh;
    var AnhSP = req.query.AnhSP;
    var HinhDang = req.query.HinhDang;
    var MoTa = req.query.MoTa;
    database.themBanh(MaBanh,TenBanh,MaLoaiBanh,AnhSP,HinhDang,MoTa,function(resultQuery){
        res.json(resultQuery);
    })
});

//sửa bánh
app.put('/suaBanh',function(req,res){
    var MaBanh = req.query.MaBanh;
    var TenBanh = req.query.TenBanh;
    var MaLoaiBanh = req.query.MaLoaiBanh;
    var AnhSP = req.query.AnhSP;
    var HinhDang = req.query.HinhDang;
    var MoTa = req.query.MoTa;
    database.suaBanh(MaBanh,TenBanh,MaLoaiBanh,AnhSP,HinhDang,MoTa,function(resultQuery){
        res.json(resultQuery);
    });
});

//Xóa bánh DONE
app.put('/XoaBanh',function(req,res){
    var MaBanh = req.query.MaBanh;
    database.xoaBanh(MaBanh,function(resultQuery){
        res.json(resultQuery);
    });
});

//------------------------------------Hóa đơn nhập----------------------
//lấy list hóa đơn nhập DONE
app.get('/allHoaDonNhap',function(req,res){
    database.getAllHoaDonNhap(function(resultQuery){
        res.json(resultQuery);
    })
});

//lấy chi tiết hóa đơn nhập  DONE
app.get('/detailHoaDonNhap',function(req,res){
    var MaPN = req.query.MaPN;
    database.getDetailHoaDonNhap(MaPN,function(resultQuery){
        res.json(resultQuery[0]);
    })
});

//Thêm hóa đơn nhập
app.get('/themHoaDonNhap',function(req,res){
    var MaAD = req.query.MaAD;
    var MaNCC = req.query.MaNCC;
    var GhiChu = req.query.GhiChu;
    database.themHoaDonNhap(MaAD,MaNCC,GhiChu,function(resultQuery){
        res.json(resultQuery);
    })
});

//Lấy List AD
app.get('/getListAD',function(req,res){
    database.getListAD(function(resultQuery){
        res.json(resultQuery);
    })
});

//Mã phiếu nhập lớn nhất DONE
app.get('/getMaPNMax',function(req,res){
    database.MaPNMax(function(resultQuery){
        res.json(resultQuery[0]);
    })
});

//Update hóa đơn nhập (thêm HDN) DONE
app.post('/taoHoaDonNhap',function(req,res){
    var MaPN = req.query.MaPN;
    var MaAD = req.query.MaAD;
    var MaNCC = req.query.MaNCC;
    database.taoHoaDonNhap(MaPN,MaAD,MaNCC,function(resultQuery){
        res.json(resultQuery);
    })
});


//Thêm chi tiết phiếu nhập
app.post('/themCTPhieuNhap',function(req,res){
    var MaPN = req.query.MaPN;
    var MaKT_Banh = req.query.MaKT_Banh;
    var NSX = req.query.NSX;
    var HSD = req.query.HSD;
    var SL = req.query.SL;
    var GhiChu = req.query.GhiChu;
    database.themCTPhieuNhap(MaPN,MaKT_Banh,NSX,HSD,SL,GhiChu,function(resultQuery){
        res.json(resultQuery);
    })
});

//Thêm kích thước + bánh mới
app.post('/themKichThuocBanh',function(req,res){
    var MaKT_Banh = req.query.MaKT_Banh;
    var MaBanh = req.query.MaBanh;
    var MaKT = req.query.MaKT;
    var DonGiaNhap = req.query.DonGiaNhap;
    var DonGiaBan = req.query.DonGiaBan;
    database.themKichThuocBanh(MaKT_Banh,MaBanh,MaKT,DonGiaNhap,DonGiaBan,function(resultQuery){
        res.json(resultQuery);
    })
});

//Mã kích thước bánh lớn nhất
app.get('/getMaKTBanhMax',function(req,res){
    database.MaKTBanhMax(function(resultQuery){
        res.json(resultQuery[0]);
    })
});

//Xóa kích thước + bánh
app.get('/xoaKichThuocBanh',function(req,res){
    var MaKT_Banh = req.query.MaKT_Banh;
    database.xoaKichThuocBanh(MaKT_Banh,function(resultQuery){
        res.json(resultQuery);
    })
});

//lấy detail HDN  DONE
app.get('/listCTHDN',function(req,res){
    var MaPN = req.query.MaPN;
    database.getListCTPN(MaPN,function(resultQuery){
        res.json(resultQuery);
    })
});

//Xóa nhiều kích thước + bánh theo mã bánh
// app.get('/xoaNhieuKichThuocBanh',function(req,res){
//     var MaBanh = req.query.MaBanh;
//     database.xoaNhieuKichThuocBanh(MaBanh,function(resultQuery){
//         res.json(resultQuery);
//     })
// });

// -------------------------- Loại bánh

//Lấy tất cả loại bánh
app.get('/listLoaiBanh',function(req,res){
    database.getAllLoaiBanh(function(resultQuery){
        res.json(resultQuery);
    })
});

// Lấy chi tiết loại bánh
app.get('/detailLoaiBanh',function(req,res){
    var MaLoaiBanh = req.query.MaLoaiBanh;
    database.getDetailLoaiBanh(MaLoaiBanh,function(resultQuery){
        res.json(resultQuery[0]);
    })
});

//Thêm loại bánh
app.post('/themLoaiBanh',function(req,res){
    var TenLoaiBanh = req.query.TenLoaiBanh;
    var AnhLoai = req.query.AnhLoai;
    var MoTa = req.query.MoTa;
    database.themLoaiBanh(TenLoaiBanh, AnhLoai, MoTa,function(resultQuery){
        res.json(resultQuery);
    })
});

//sửa loại bánh
app.put('/suaLoaiBanh',function(req,res){
    var MaLoaiBanh = req.query.MaLoaiBanh;
    var TenLoaiBanh = req.query.TenLoaiBanh;
    var AnhLoai = req.query.AnhLoai;
    var MoTa = req.query.MoTa;
    database.suaLoaiBanh(MaLoaiBanh,TenLoaiBanh, AnhLoai, MoTa,function(resultQuery){
        res.json(resultQuery);
    })
});

//xóa loại bánh
app.put('/XoaLoaiBanh',function(req,res){
    var MaLoaiBanh = req.query.MaLoaiBanh;
    database.xoaLoaiBanh(MaLoaiBanh,function(resultQuery){
        res.json(resultQuery);
    });
});

//lấy bánh theo loại bánh
app.get('/listBanhCuaLoaiBanh',function(req,res){
    var MaLoaiBanh = req.query.MaLoaiBanh;
    database.getAllBanhTheoLoaiBanh(MaLoaiBanh,function(resultQuery){
        res.json(resultQuery);
    })
});

//lấy hạn sử dụng theo kích thước của từng mã bánh
app.get('/listHSDCuaKichThuocBanh',function(req,res){
    var MaBanh = req.query.MaBanh;
    database.getHSDKichThuocBanhTheoMaBanh(MaBanh,function(resultQuery){
        res.json(resultQuery);
    })
});

//xóa hạn sử dụng theo kích thước của từng mã bánh 
app.put('/xoaHSDKichThuocBanhTheoMaBanh',function(req,res){
    var MaKT_Banh = req.query.MaKT_Banh;
    var NSX = req.query.NSX;
    var HSD = req.query.HSD;
    database.xoaHSDKichThuocBanhTheoMaBanh(MaKT_Banh,NSX,HSD,function(resultQuery){
        res.json(resultQuery);
    });
});

//---------------------------------------------Hóa đơn xuất--------------
//Lấy list hóa đơn xuất
app.get('/listHoaDonXuat',function(req,res){
    database.getAllHoaDonXuat(function(resultQuery){
        res.json(resultQuery);
    })
});

//Lấy chi tiết hóa đơn
app.get('/detailHDXuat',function(req,res){
    var MaHD = req.query.MaHD;
    database.getDetailHoaDonXuat(MaHD,function(resultQuery){
        res.json(resultQuery[0]);
    })
});

//Lấy list chi tiết hóa đơn
app.get('/ListCTHD',function(req,res){
    var MaHD = req.query.MaHD;
    database.getListCTHD(MaHD,function(resultQuery){
        res.json(resultQuery);
    })
});

//xác thực đơn hàng
app.put('/xacThucDonHang',function(req,res){
    var MaHD = req.query.MaHD;
    database.xacThucDonHang(MaHD,function(resultQuery){
        res.json(resultQuery);
    });
});

//xác thực giao hàng
app.put('/xacThucGiaoHang',function(req,res){
    var MaHD = req.query.MaHD;
    database.xacThucGiaoHang(MaHD,function(resultQuery){
        res.json(resultQuery);
    });
});

//xác thực thanh toán
app.put('/xacThucThanhToan',function(req,res){
    var MaHD = req.query.MaHD;
    database.xacThucThanhToan(MaHD,function(resultQuery){
        res.json(resultQuery);
    });
});

//Số tiền còn lại
app.put('/datCoc',function(req,res){
    var MaHD = req.query.MaHD;
    var SoTienConLai = req.query.SoTienConLai;
    database.datCoc(MaHD,SoTienConLai,function(resultQuery){
        res.json(resultQuery);
    });
});

//get mã HD max
app.get('/getMaHDMax',function(req,res){
    databaseUser.getMaHDMax(function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy HSD nhỏ nhất
app.get('/getHSDMin',function(req,res){
    var MaBanh = req.query.MaBanh;
    var MaKT = req.query.MaKT;
    databaseUser.getHSDMin(MaBanh,MaKT,function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy mã CTPN nhỏ nhất
app.get('/getMaCTPNMin',function(req,res){
    var MaBanh = req.query.MaBanh;
    var MaKT = req.query.MaKT;
    var HSD = req.query.HSD;
    databaseUser.getMaCTPNMin(MaBanh,MaKT,HSD,function(resultQuery){
        res.json(resultQuery);
    });
});

//Trừ số lượng
app.put('/putSLTon',function(req,res){
    var SLTon = req.query.SLTon;
    var MaKT_Banh = req.query.MaKT_Banh;
    var HSD = req.query.HSD;
    var MaCTPN = req.query.MaCTPN;
    databaseUser.putSLTon(SLTon,MaKT_Banh,HSD,MaCTPN,function(resultQuery){
        res.json(resultQuery);
    });
});

//Xóa từng SP trong giở hàng
app.delete('/deleteTungSPGioHang',function(req,res){
    var MaKH = req.query.MaKH;
    var MaKT_Banh = req.query.MaKT_Banh;
    databaseUser.deleteTungSPGioHang(MaKH,MaKT_Banh,function(resultQuery){
        res.json(resultQuery);
    });
});

//Xóa hết giở hàng
app.delete('/deleteGioHang',function(req,res){
    var MaKH = req.query.MaKH;
    databaseUser.deleteGioHang(MaKH,function(resultQuery){
        res.json(resultQuery);
    });
});

//Them vào giỏ hàng
app.post('/themSPVaoGioHang',function(req,res){
    var MaKH = req.query.MaKH;
    var MaKT_Banh = req.query.MaKT_Banh;
    var SL = req.query.SL;
    databaseUser.themSPVaoGioHang(MaKH,MaKT_Banh,SL,function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy mã kich thước bánh
app.get('/getMaKTBanh',function(req,res){
    var MaBanh = req.query.MaBanh;
    var MaKT = req.query.MaKT;
    databaseUser.getMaKTBanh(MaBanh,MaKT,function(resultQuery){
        res.json(resultQuery[0]);
    });
});

//lấy list hóa đơn lịch sử của khách
app.get('/getListLichSuMuaHang',function(req,res){
    var MaKH = req.query.MaKH;
    databaseUser.getListLichSuMuaHang(MaKH,function(resultQuery){
        res.json(resultQuery);
    });
});

//lấy list hóa đơn đang giao của khách
app.get('/getListDangGiaoHang',function(req,res){
    var MaKH = req.query.MaKH;
    databaseUser.getListDangGiaoHang(MaKH,function(resultQuery){
        res.json(resultQuery);
    });
});

//lấy list hóa đơn đang chờ xác nhận của khách
app.get('/getListLichDangChoXacNhan',function(req,res){
    var MaKH = req.query.MaKH;
    databaseUser.getListLichDangChoXacNhan(MaKH,function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy CTHD
app.get('/getCTHD',function(req,res){
    var MaHD = req.query.MaHD;
    databaseUser.getCTHD(MaHD,function(resultQuery){
        res.json(resultQuery);
    });
});

//-----------------------------------------Nhà cung cấp-----------------
//thêm nhà cung cấp
app.post('/themNCC',function(req,res){
    var TenNCC = req.query.TenNCC;
    var SDT = req.query.SDT;
    var Email = req.query.Email;
    var DiaChi = req.query.DiaChi;
    var Phuong = req.query.Phuong;
    var Quan = req.query.Quan;
    var ThanhPho = req.query.ThanhPho;
    database.themNCC(TenNCC,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy tất cả NCC
app.get('/listNCC',function(req,res){
    database.getAllNCC(function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy detail NCC DONE
app.get('/detailNCC',function(req,res){
    var MaNCC = req.query.MaNCC;
    database.getDetailNCC(MaNCC,function(resultQuery){
        res.json(resultQuery[0]);
    });
});

//Sửa NCC
app.put('/suaNCC',function(req,res){
    var MaNCC = req.query.MaNCC;
    var TenNCC = req.query.TenNCC;
    var SDT = req.query.SDT;
    var Email = req.query.Email;
    var DiaChi = req.query.DiaChi;
    var Phuong = req.query.Phuong;
    var Quan = req.query.Quan;
    var ThanhPho = req.query.ThanhPho;
    database.suaNCC(MaNCC,TenNCC,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,function(resultQuery){
        res.json(resultQuery);
    });
});

//Xóa NCC DONE
app.put('/XoaNCC',function(req,res){
    var MaNCC = req.query.MaNCC;
    database.XoaNCC(MaNCC,function(resultQuery){
        res.json(resultQuery);
    });
});

//---------------------------------------- Khách hàng

//Lấy tất cả khách hàng : DONE
app.get('/khachhang',function(req,res){
    database.getAllKhachHang(function(resultQuery){
        res.json(resultQuery);
    })
});

//Lấy chi tiết khách hàng : DONE
app.get('/detailkhachhang',function(req,res){
    var MaKH = req.query.MaKH;
    database.getKhachHang(MaKH,function(resultQuery){
        res.json(resultQuery[0]);
    })
});

//Thêm khách hàng
app.get('/themKhachHang',function(req,res){
    var MaTK = req.query.MaTK;
    var TenKH = req.query.TenKH;
    var NgaySinh = req.query.NgaySinh;
    var GioiTinh = req.query.GioiTinh;
    var SDT = req.query.SDT;
    var Email = req.query.Email;
    var Anh = req.query.Anh;
    var DiaChi = req.query.DiaChi;
    var Phuong = req.query.Phuong;
    var Quan = req.query.Quan;
    var ThanhPho = req.query.ThanhPho;
    var MatKhau= req.query.MatKhau;
    database.themKhachHang(MaTK,TenKH,NgaySinh,GioiTinh,SDT,Email,Anh,DiaChi,Phuong,Quan,ThanhPho,MatKhau,function(resultQuery){
        res.json(resultQuery);
    });
});

//sửa khách hàng
app.put('/suaKhachHang',function(req,res){
    var MaKH = req.query.MaKH;
    var NgaySinh = req.query.NgaySinh;
    var GioiTinh = req.query.GioiTinh;
    var SDT = req.query.SDT;
    var Email = req.query.Email;
    var Anh = req.query.Anh;
    var DiaChi = req.query.DiaChi;
    var Phuong = req.query.Phuong;
    var Quan = req.query.Quan;
    var ThanhPho = req.query.ThanhPho;
    database.suaKhachHang(MaKH,NgaySinh,GioiTinh,SDT,Email,Anh,DiaChi,Phuong,Quan,ThanhPho,function(resultQuery){
        res.json(resultQuery);
    });
});

//sửa mật khẩu
app.put('/suaMatKhau',function(req,res){
    var MaKH = req.query.MaKH;
    var MatKhau = req.query.MatKhau;
    database.suaMatKhau(MaKH,MatKhau,function(resultQuery){
        res.json(resultQuery);
    });
});

//sửa khách hàng
app.put('/suaKhachHangDatHang',function(req,res){
    var MaKH = req.query.MaKH;
    var TenKH = req.query.TenKH;
    var SDT = req.query.SDT;
    var Email = req.query.Email;
    var DiaChi = req.query.DiaChi;
    var Phuong = req.query.Phuong;
    var Quan = req.query.Quan;
    var ThanhPho = req.query.ThanhPho;
    database.suaKhachHangDatHang(MaKH,TenKH,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,function(resultQuery){
        res.json(resultQuery);
    });
});

//Đăng ký
app.post('/dangKy',function(req,res){
    var TenKH = req.query.TenKH;
    var NgaySinh = req.query.NgaySinh;
    var GioiTinh = req.query.GioiTinh;
    var SDT = req.query.SDT;
    var Email = req.query.Email;
    var DiaChi = req.query.DiaChi;
    var Phuong = req.query.Phuong;
    var Quan = req.query.Quan;
    var ThanhPho = req.query.ThanhPho;
    var MatKhau = req.query.MatKhau;
    databaseUser.dangKy(TenKH,NgaySinh,GioiTinh,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,MatKhau,function(resultQuery){
        res.json(resultQuery);
    });
});


//Sửa dịa chỉ khách hàng
app.put('/suaDiaChiKhachHang',function(req,res){
    var MaKH = req.query.MaKH;
    var DiaChi = req.query.DiaChi;
    var Phuong = req.query.Phuong;
    var Quan = req.query.Quan;
    var ThanhPho = req.query.ThanhPho;
    database.suaDiaChiKhachHang(MaKH,DiaChi,Phuong,Quan,ThanhPho,function(resultQuery){
        res.json(resultQuery);
    });
});

//xóa khách hàng
app.get('/xoaKhachHang',function(req,res){
    var MaKH = req.query.MaKH;
    database.xoaKhachHang(MaKH,function(resultQuery){
        res.json(resultQuery);
    });
});

//Số đơn khách đã đặt
app.get('/soHoaDonCuaKhachHang',function(req,res){
    var MaKH = req.query.MaKH;
    database.soHoaDonCuaKhachHang(MaKH,function(resultQuery){
        res.json(resultQuery[0]);
    });
});

//lấy danh sách hóa đơn của khách
app.get('/danhSachHoaDonCuaKhachHang',function(req,res){
    var MaKH = req.query.MaKH;
    database.danhSachHoaDonCuaKhachHang(MaKH,function(resultQuery){
        res.json(resultQuery);
    });
});

//lay ncc theo banh
app.get('/nccCuaBanh',function(req,res){
    var MaBanh = req.query.MaBanh;
    database.getNCCTheoBanh(MaBanh,function(resultQuery){
        res.json(resultQuery);
    });
});

//xóa ncc theo bánh (phiếu nhập)
app.put('/xoaNCCCuaBanh',function(req,res){
    var MaNCC = req.query.MaNCC;
    var MaBanh = req.query.MaBanh;
    database.XoaNCCTrenBanh(MaBanh,MaNCC,function(resultQuery){
        res.json(resultQuery);
    });
});



//------------------------------------------Khuyến Mại--------------------------------
//Lấy khuyến mại
app.get('/allKhuyenMai',function(req,res){
    database.getAllKhuyenMai(function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy bánh chưa khuyến mại
app.get('/getBanhChuaKM',function(req,res){
    database.getBanhChuaKM(function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy chi tiết khuyến mại
app.get('/detailKhuyenMai',function(req,res){
    var MaKM = req.query.MaKM;
    database.getDetailKhuyenMai(MaKM,function(resultQuery){
        res.json(resultQuery[0]);
    });
});

//Thêm khuyến mại DONE
app.post('/themKM',function(req,res){
    var TieuDe = req.query.TieuDe;
    var AnhKM = req.query.AnhKM;
    var GiaTri = req.query.GiaTri;
    var LoaiKM = req.query.LoaiKM;
    var ThoiGianBatDau = req.query.ThoiGianBatDau;
    var ThoiGianKetThuc = req.query.ThoiGianKetThuc;
    var MoTa = req.query.MoTa;
    database.themKM(TieuDe,AnhKM,GiaTri,LoaiKM,ThoiGianBatDau,ThoiGianKetThuc,MoTa,function(resultQuery){
        res.json(resultQuery);
    });
});

//Thêm bánh vào khuyến mại
app.post('/themBanhVaoKM',function(req,res){
    var MaBanh = req.query.MaBanh;
    var MaKM = req.query.MaKM;
    database.themBanhVaoKM(MaBanh,MaKM,function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy list bánh khuyến mại
app.get('/listBanhKM',function(req,res){
    var MaKM = req.query.MaKM;
    database.getBanhKM(MaKM,function(resultQuery){
        res.json(resultQuery);
    });
});

//sửa khuyến mại DONE
app.put('/suaKM',function(req,res){
    var MaKM = req.query.MaKM;
    var TieuDe = req.query.TieuDe;
    var GiaTri = req.query.GiaTri;
    var LoaiKM = req.query.LoaiKM;
    var ThoiGianBatDau = req.query.ThoiGianBatDau;
    var ThoiGianKetThuc = req.query.ThoiGianKetThuc;
    var MoTa = req.query.MoTa;
    database.suaKM(TieuDe,GiaTri,LoaiKM,ThoiGianBatDau,ThoiGianKetThuc,MoTa,MaKM,function(resultQuery){
        res.json(resultQuery);
    });
});

//xóa khuyến mại
app.put('/xoaKM',function(req,res){
    var MaKM = req.query.MaKM;
    var TrangThai = req.query.TrangThai;
    database.xoaKM(TrangThai,MaKM,function(resultQuery){
        res.json(resultQuery);
    });
});


// ------------------------------Báo cáo-------------------
//Lấy tổng háo đơn theo tháng
app.get('/tongGiaTriHoaDon',function(req,res){
    var Thang = req.query.Thang;
    var Nam = req.query.Nam;
    database.tongGiaTriHoaDon(Thang,Nam,function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy hóa đơn 
app.get('/allGiaTriHoaDon',function(req,res){
    database.allGiaTriHoaDon(function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy tổng hóa đơn nhập theo tháng
app.get('/tongGiaTriHoaDonNhap',function(req,res){
    var Thang = req.query.Thang;
    var Nam = req.query.Nam;
    database.tongGiaTriHoaDonNhap(Thang,Nam,function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy hóa đơn nhập
app.get('/allGiaTriHoaDonNhap',function(req,res){
    database.allGiaTriHoaDonNhap(function(resultQuery){
        res.json(resultQuery);
    });
});

//Lấy doanh thu
app.get('/doanhThu',function(req,res){
    var Thang = req.query.Thang;
    database.getDoanhThu(Thang,function(resultQuery){
        res.json(resultQuery[0]);
    });
});

//Lấy vốn
app.get('/von',function(req,res){
    var Thang = req.query.Thang;
    database.getVon(Thang,function(resultQuery){
        res.json(resultQuery[0]);
    });
});

//Tạo hóa đơn
app.post('/putBill',function(req,res){
    var MaHD = req.query.MaHD;
    var MaKH = req.query.MaKH;
    var PhuongThucThanhToan = req.query.PhuongThucThanhToan;
    var GhiChu = req.query.GhiChu;
    databaseUser.putBill(MaHD,MaKH,PhuongThucThanhToan,GhiChu,function(resultQuery){
        res.json(resultQuery);
    });
});

//Tạo CTHD
app.post('/postDetailBill',function(req,res){
    var MaHD = req.query.MaHD;
    var MaKT_Banh = req.query.MaKT_Banh;
    var SL = req.query.SL;
    databaseUser.postDetailBill(MaHD, MaKT_Banh, SL,function(resultQuery){
        res.json(resultQuery);
    });
});

//------------------------Login---------------
//login ad
app.get('/checkLogin',function(req,res){
    var TenAD = req.query.TenAD;
    var MatKhau = req.query.MatKhau;
    database.checkLogin(TenAD,MatKhau,function(resultQuery){
        res.json(resultQuery[0]);
    });
});

//list ad
app.get('/getListAD',function(req,res){
    database.getListAD(function(resultQuery){
        res.json(resultQuery);
    });
});

//thêm ad
app.post('/themAdmin',function(req,res){
    var Anh = req.query.Anh;
    var TenAD = req.query.TenAD;
    var MatKhau = req.query.MatKhau;
    database.themAdmin(Anh, TenAD, MatKhau,function(resultQuery){
        res.json(resultQuery);
    })
});

//xóa ad
app.put('/xoaAdmin',function(req,res){
    var MaAD = req.query.MaAD;
    database.xoaAdmin(MaAD,function(resultQuery){
        res.json(resultQuery);
    })
});

//get ad
app.get('/getAD',function(req,res){
    var MaAD = req.query.MaAD;
    database.getAD(MaAD,function(resultQuery){
        res.json(resultQuery[0]);
    });
});

//login
app.put('/login',function(req,res){
    var CheckLogin = req.query.CheckLogin;
    var TenAD = req.query.TenAD;
    database.login(CheckLogin,TenAD,function(resultQuery){
        res.json(resultQuery);
    });
});

// check login user
app.get('/checkLoginUser',function(req,res){
    var TenKH = req.query.TenKH;
    var MatKhau = req.query.MatKhau;
    databaseUser.checkLoginUser(TenKH,MatKhau,function(resultQuery){
        res.json(resultQuery[0]);
    });
});

// -----------------------------------------------apload ảnh-----------
app.use('/Upload',express.static('Upload'));
app.use('/AnhLoai',express.static('AnhLoai'));
app.use('/AnhUser',express.static('AnhUser'));
app.use('/AnhKM',express.static('AnhKM'));
app.use('/AnhAdmin',express.static('AnhAdmin'));


const storage = multer.diskStorage({
    destination: (req,file,callBack) => {
        callBack(null,'Upload');
    },
    filename: (req,file,callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

const storageAnhLoai = multer.diskStorage({
    destination: (req,file,callBack) => {
        callBack(null,'AnhLoai');
    },
    filename: (req,file,callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

const storageAnhUser = multer.diskStorage({
    destination: (req,file,callBack) => {
        callBack(null,'AnhUser');
    },
    filename: (req,file,callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

const storageAnhKM = multer.diskStorage({
    destination: (req,file,callBack) => {
        callBack(null,'AnhKM');
    },
    filename: (req,file,callBack) => {
        callBack(null, `${file.originalname}`)
    }
})

const storageAnhAdmin = multer.diskStorage({
    destination: (req,file,callBack) => {
        callBack(null,'AnhAdmin');
    },
    filename: (req,file,callBack) => {
        callBack(null, `${file.originalname}`)
    }
})


var upload = multer({ storage: storage});
var uploadAnhLoai = multer({ storage: storageAnhLoai});
var uploadAnhUser = multer({ storage: storageAnhUser});
var uploadAnhKM = multer({ storage: storageAnhKM});
var uploadAnhAdmin = multer({ storage: storageAnhAdmin});

app.post('/file',upload.single('file'),(req,res,next) => {
    const file = req.file;
    console.log(file.filename);
    if(!file){
        const error = new Error("lỗi mẹ rồi");
        error.httpStatusCode = 400;
        return next(error)
    }
    res.send(JSON.stringify(file))
})


app.post('/fileAnhLoai',uploadAnhLoai.single('fileAnhLoai'),(req,res,next) => {
    const file = req.file;
    console.log(file.filename);
    if(!file){
        const error = new Error("lỗi mẹ rồi");
        error.httpStatusCode = 400;
        return next(error)
    }
    res.send(JSON.stringify(file))
})

app.post('/fileAnhUser',uploadAnhUser.single('fileAnhUser'),(req,res,next) => {
    const file = req.file;
    console.log(file.filename);
    if(!file){
        const error = new Error("lỗi mẹ rồi");
        error.httpStatusCode = 400;
        return next(error)
    }
    res.send(JSON.stringify(file))
})

app.post('/fileAnhKM',uploadAnhKM.single('fileAnhKM'),(req,res,next) => {
    const file = req.file;
    console.log(file.filename);
    if(!file){
        const error = new Error("lỗi mẹ rồi");
        error.httpStatusCode = 400;
        return next(error)
    }
    res.send(JSON.stringify(file))
})

app.post('/fileAnhAdmin',uploadAnhAdmin.single('fileAnhAdmin'),(req,res,next) => {
    const file = req.file;
    console.log(file.filename);
    if(!file){
        const error = new Error("lỗi mẹ rồi");
        error.httpStatusCode = 400;
        return next(error)
    }
    res.send(JSON.stringify(file))
})
//---------------------------------giỏ hàng----------------------------
//Giỏ hàng
app.get('/getGioHang',function(req,res){
    var MaKH = req.query.MaKH;
    databaseUser.getGioHang(MaKH,function(resultQuery){
        res.json(resultQuery);
    })
});

//SL banh max
app.get('/getSLBanhMax',function(req,res){
    var MaBanh = req.query.MaBanh;
    var MaKT = req.query.MaKT;
    databaseUser.getSLBanhMax(MaBanh,MaKT,function(resultQuery){
        res.json(resultQuery);
    })
});

//Tăng Số lượng
app.put('/tangSL',function(req,res){
    var SL = req.query.SL;
    var MaKH = req.query.MaKH;
    var MaKT_Banh = req.query.MaKT_Banh;
    var MaGH = req.query.MaGH;
    databaseUser.tangSL(SL,MaKH,MaKT_Banh,MaGH,function(resultQuery){
        res.json(resultQuery);
    });
});




//---------------------------------------------------------user------------------------------------
// user lấy kích thước của bánh
app.get('/listKichThuocCuaBanh',function(req,res){
    var MaBanh = req.query.MaBanh;
    databaseUser.getKichThuocBanhTheoMaBanh(MaBanh,function(resultQuery){
        res.json(resultQuery);
    })
});

//lấy tên kích thước của bánh
app.get('/listTenKichThuocCuaBanh',function(req,res){
    var MaBanh = req.query.MaBanh;
    databaseUser.getTenKichThuocBanhTheoMaBanh(MaBanh,function(resultQuery){
        res.json(resultQuery);
    })
});

app.listen(process.env.PORT || 3000,function () {
    console.log('CORS-enabled web server listening on port '+ process.env.PORT)
  })

  