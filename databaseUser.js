var mysql = require('mysql2');
// var connection = mysql.createConnection({
//     host : 'localhost',
//     user : 'root',
//     password : '',
//     database : 'doan',
// });
var connection = mysql.createConnection({
    host : 'containers-us-west-1.railway.app',
    port: 5458,
    user : 'root',
    password : '5PMkUiOy82PsqiQNH7K4',
    database : 'railway',
});

var connect = function(){
    connection.connect(function(err){
        if(!err){
            console.log("database is connected!!!!");
        } else console.log(err);
    })
}

var close = function(){
    connection.end(function(err){
        if(!err){
            console.log("closed db");
        }
    })
}


//-------------login-----------------

// check login user
exports.checkLoginUser = function(TenKH, MatKhau,callbackQuery){
    connect();
    connection.query("SELECT MaKH,TenKH,NgaySinh,GioiTinh,SDT,Email,Anh,DiaChi,Phuong,Quan,ThanhPho,MatKhau,TrangThai FROM khachhang WHERE khachhang.TenKH = '"+TenKH+"' AND khachhang.MatKhau = '"+MatKhau+"'",function(err, results, _fields){
        try {
            callbackQuery(results);
        }
        catch (err){
            console.log("không tồn tại");
        }
    })
}

//Thêm khuyến mại DONE
exports.dangKy = function(TenKH,NgaySinh,GioiTinh,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,MatKhau,callbackQuery){
    connect();
    connection.query("INSERT INTO khachhang(TenKH,MaTK , NgaySinh, GioiTinh, SDT, Email, Anh, DiaChi, Phuong, Quan, ThanhPho, MatKhau) VALUES ('"+TenKH+"',2,'"+NgaySinh+"', '"+GioiTinh+"', '"+SDT+"', '"+Email+"', 'http://localhost:3000/AnhUser/defaultUser.jpg', '"+DiaChi+"', '"+Phuong+"', '"+Quan+"', '"+ThanhPho+"','"+MatKhau+"')",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}


//----------------------------bánh-----------------------
//lấy kích thước của bánh
exports.getKichThuocBanhTheoMaBanh = function(MaBanh,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,kichthuoc.MaKT,ct_phieunhap.MaKT_Banh,kichthuoc.TenKT,DATE_FORMAT(ct_phieunhap.NSX, '%Y-%m-%d') AS NSX,DATE_FORMAT(ct_phieunhap.HSD, '%Y-%m-%d') AS HSD,ct_phieunhap.SL,kichthuoc_banh.DonGiaNhap,kichthuoc_banh.DonGiaBan FROM ct_phieunhap ,kichthuoc,kichthuoc_banh WHERE kichthuoc_banh.MaKT=kichthuoc.MaKT and kichthuoc_banh.MaKT_Banh= ct_phieunhap.MaKT_Banh AND ct_phieunhap.TrangThai = 1 AND kichthuoc_banh.TrangThai = 1 AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) and kichthuoc_banh.MaBanh="+MaBanh+" ORDER BY `kichthuoc_banh`.`DonGiaBan` ASC",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy tên kích thước của bánh
exports.getTenKichThuocBanhTheoMaBanh = function(MaBanh,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc.MaKT,kichthuoc_banh.DonGiaBan,kichthuoc.TenKT,SUM(ct_phieunhap.SL) AS SL,SUM(ct_phieunhap.SLTon) AS SLTon FROM ct_phieunhap ,kichthuoc,kichthuoc_banh WHERE kichthuoc_banh.MaKT=kichthuoc.MaKT and kichthuoc_banh.MaKT_Banh= ct_phieunhap.MaKT_Banh AND ct_phieunhap.TrangThai = 1 AND kichthuoc_banh.TrangThai = 1 AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) and kichthuoc_banh.MaBanh="+MaBanh+" GROUP BY kichthuoc_banh.MaKT ORDER BY `kichthuoc`.`TenKT` ASC",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//-----------------------------------giỏ hàng-----------------------
//Giỏ hàng
exports.getGioHang = function(MaKH,callbackQuery){
    connect();
    connection.query("SELECT giohang.MaGH,kichthuoc.MaKT,kichthuoc.TenKT,kichthuoc_banh.MaBanh,giohang.MaKT_Banh,giohang.MaKH,SUM(giohang.SL) AS SL,banh.TenBanh,kichthuoc_banh.DonGiaBan,banh.AnhSP,khuyenmai.GiaTri,khuyenmai.LoaiKM, ct_phieunhap.NSX,MIN(ct_phieunhap.HSD) as HSD,SUM(ct_phieunhap.SLTon) AS SLTon FROM giohang INNER JOIN khachhang ON giohang.MaKH = khachhang.MaKH INNER JOIN kichthuoc_banh ON kichthuoc_banh.MaKT_Banh = giohang.MaKT_Banh INNER JOIN banh ON kichthuoc_banh.MaBanh = banh.MaBanh INNER JOIN kichthuoc ON kichthuoc.MaKT = kichthuoc_banh.MaKT INNER JOIN ct_phieunhap ON ct_phieunhap.MaKT_Banh = kichthuoc_banh.MaKT_Banh LEFT JOIN khuyenmai_banh ON khuyenmai_banh.MaBanh = banh.MaBanh LEFT JOIN khuyenmai ON khuyenmai.MaKM = khuyenmai_banh.MaKM WHERE giohang.MaKH = "+MaKH+" AND ct_phieunhap.NSX < NOW() AND ct_phieunhap.HSD > NOW() GROUP BY giohang.MaKT_Banh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//SL banh max
exports.getSLBanhMax = function(MaBanh,MaKT,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,SUM(ct_phieunhap.SLTon) AS SLMax,kichthuoc.MaKT FROM kichthuoc_banh INNER JOIN ct_phieunhap ON ct_phieunhap.MaKT_Banh = kichthuoc_banh.MaKT_Banh INNER JOIN kichthuoc ON kichthuoc_banh.MaKT = kichthuoc.MaKT WHERE kichthuoc_banh.MaBanh = "+MaBanh+" AND kichthuoc.MaKT = "+MaKT+" AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) GROUP BY kichthuoc_banh.MaBanh",function(err, results, _fields){
        if(!err){
                callbackQuery(results[0]);
            }else console.log(err);
        })
}

//Tăng Số lượng
exports.tangSL = function(SL,MaKH,MaKT_Banh,MaGH,callbackQuery){
    connect();
    connection.query("UPDATE giohang SET giohang.SL = "+ SL +" WHERE giohang.MaKH = "+MaKH+" AND giohang.MaKT_Banh = "+MaKT_Banh+" AND giohang.MaGH = "+MaGH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}


// ----------------------------------------Hóa đơn--------------------
//tạo hóa đơn
exports.putBill = function(MaHD, MaKH, PhuongThucThanhToan, GhiChu,callbackQuery){
    connect();
    connection.query("INSERT INTO hoadon(MaHD,MaKH,PhuongThucThanhToan,GhiChu) VALUES ("+MaHD+","+MaKH+",'"+PhuongThucThanhToan+"','"+GhiChu+"')",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Tạo CTHD
exports.postDetailBill = function(MaHD, MaKT_Banh, SL,callbackQuery){
    connect();
    connection.query("INSERT INTO ct_hoadon(MaHD,MaKT_Banh,SL) VALUES ("+MaHD+","+MaKT_Banh+","+SL+")",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//get mã HD max
exports.getMaHDMax = function(callbackQuery){
    connect();
    connection.query("SELECT MAX(hoadon.MaHD) AS MaHDMax FROM hoadon WHERE 1",function(err, results, _fields){
        if(!err){
                callbackQuery(results[0]);
            }else console.log(err);
        })
}

//Lấy HSD nhỏ nhất
exports.getHSDMin = function(MaBanh,MaKT,callbackQuery){
    connect();
    connection.query("SELECT MIN(DATE_FORMAT(ct_phieunhap.HSD, '%Y-%m-%d')) AS HSD,kichthuoc_banh.MaBanh,kichthuoc_banh.MaKT FROM ct_phieunhap INNER JOIN kichthuoc_banh ON kichthuoc_banh.MaKT_Banh = ct_phieunhap.MaKT_Banh WHERE kichthuoc_banh.MaBanh = "+MaBanh+" AND kichthuoc_banh.MaKT="+MaKT+" AND ct_phieunhap.SLTon>0 AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) AND ct_phieunhap.TrangThai = 1 GROUP BY kichthuoc_banh.MaKT",function(err, results, _fields){
        if(!err){
                callbackQuery(results[0]);
            }else console.log(err);
        })
}

//Lấy mã CTPN nhỏ nhất
exports.getMaCTPNMin = function(MaBanh,MaKT,HSD,callbackQuery){
    connect();
    connection.query("SELECT MIN(ct_phieunhap.MaCTPN) AS MaCTPN,DATE_FORMAT(ct_phieunhap.HSD, '%Y-%m-%d') AS HSD,kichthuoc_banh.MaBanh,kichthuoc_banh.MaKT FROM ct_phieunhap INNER JOIN kichthuoc_banh ON kichthuoc_banh.MaKT_Banh = ct_phieunhap.MaKT_Banh WHERE kichthuoc_banh.MaBanh = "+MaBanh+" AND kichthuoc_banh.MaKT="+MaKT+" AND ct_phieunhap.SLTon>0 AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) AND DATE_FORMAT(ct_phieunhap.HSD, '%Y-%m-%d') = '"+HSD+"' AND ct_phieunhap.TrangThai = 1",function(err, results, _fields){
        if(!err){
                callbackQuery(results[0]);
            }else console.log(err);
        })
}

//Trừ số lượng
exports.putSLTon = function(SLTon,MaKT_Banh,HSD,MaCTPN,callbackQuery){
    connect();
    connection.query("UPDATE ct_phieunhap SET ct_phieunhap.SLTon = "+SLTon+" WHERE ct_phieunhap.MaKT_Banh = "+MaKT_Banh+" AND ct_phieunhap.HSD = '"+HSD+"' AND ct_phieunhap.MaCTPN = "+MaCTPN+" AND ct_phieunhap.SLTon>0",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//sửa số lượng
exports.updateSLTon = function(SL,MaKH,MaKT_Banh,MaGH,callbackQuery){
    connect();
    connection.query("UPDATE giohang SET giohang.SL = "+ SL +" WHERE giohang.MaKH = "+MaKH+" AND giohang.MaKT_Banh = "+MaKT_Banh+" AND giohang.MaGH = "+MaGH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Xóa từng SP trong giở hàng
exports.deleteTungSPGioHang = function(MaKH,MaKT_Banh,callbackQuery){
    connect();
    connection.query("DELETE FROM giohang WHERE giohang.MaKT_Banh = "+MaKT_Banh+" AND giohang.MaKH = "+MaKH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Xóa hết giở hàng
exports.deleteGioHang = function(MaKH,callbackQuery){
    connect();
    connection.query("DELETE FROM giohang WHERE giohang.MaKH = "+MaKH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Them vào giỏ hàng
exports.themSPVaoGioHang = function(MaKH,MaKT_Banh,SL,callbackQuery){
    connect();
    connection.query("INSERT INTO giohang(MaKH, MaKT_Banh, SL) VALUES ("+MaKH+","+MaKT_Banh+","+SL+")",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy mã kich thước bánh
exports.getMaKTBanh = function(MaBanh,MaKT,callbackQuery){
    connect();
    connection.query("SELECT MIN(kichthuoc_banh.MaKT_Banh) AS MaKT_Banh FROM kichthuoc_banh INNER JOIN ct_phieunhap ON ct_phieunhap.MaKT_Banh = kichthuoc_banh.MaKT_Banh WHERE kichthuoc_banh.MaBanh="+MaBanh+" AND kichthuoc_banh.MaKT="+MaKT+" AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) AND ct_phieunhap.SLTon>0 AND ct_phieunhap.TrangThai=1 GROUP BY kichthuoc_banh.MaKT_Banh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy list hóa đơn lịch sử của khách
exports.getListLichSuMuaHang= function(MaKH,callbackQuery){
    connect();
    connection.query("SELECT hoadon.MaHD,hoadon.MaKH,hoadon.SoTienConLai,khachhang.TenKH,hoadon.TrangThaiGiaoHang,hoadon.TrangThaiThanhToan,hoadon.TrangThaiXacThuc,hoadon.created_at AS NgayTaoHD,hoadon.GhiChu FROM hoadon INNER JOIN khachhang ON hoadon.MaKH = khachhang.MaKH INNER JOIN ct_hoadon ON hoadon.MaHD = ct_hoadon.MaHD WHERE  khachhang.TrangThai =1 AND ct_hoadon.TrangThai = 1 AND hoadon.MaKH = "+MaKH+" and hoadon.TrangThaiGiaoHang = 1 and hoadon.TrangThaiThanhToan = 1 and hoadon.TrangThaiXacThuc = 1 GROUP BY ct_hoadon.MaHD",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy list hóa đơn đang giao của khách
exports.getListDangGiaoHang= function(MaKH,callbackQuery){
    connect();
    connection.query("SELECT hoadon.MaHD,hoadon.MaKH,hoadon.SoTienConLai,khachhang.TenKH,hoadon.TrangThaiGiaoHang,hoadon.TrangThaiThanhToan,hoadon.TrangThaiXacThuc,hoadon.created_at AS NgayTaoHD,hoadon.GhiChu FROM hoadon INNER JOIN khachhang ON hoadon.MaKH = khachhang.MaKH INNER JOIN ct_hoadon ON hoadon.MaHD = ct_hoadon.MaHD WHERE  khachhang.TrangThai =1 AND ct_hoadon.TrangThai = 1 AND hoadon.MaKH = "+MaKH+" and hoadon.TrangThaiGiaoHang = 0 and hoadon.TrangThaiXacThuc = 1 GROUP BY ct_hoadon.MaHD",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy list hóa đơn đang chờ xác nhận của khách
exports.getListLichDangChoXacNhan= function(MaKH,callbackQuery){
    connect();
    connection.query("SELECT hoadon.MaHD,hoadon.MaKH,hoadon.SoTienConLai,khachhang.TenKH,hoadon.TrangThaiGiaoHang,hoadon.TrangThaiThanhToan,hoadon.TrangThaiXacThuc,hoadon.created_at AS NgayTaoHD,hoadon.GhiChu FROM hoadon INNER JOIN khachhang ON hoadon.MaKH = khachhang.MaKH INNER JOIN ct_hoadon ON hoadon.MaHD = ct_hoadon.MaHD WHERE  khachhang.TrangThai =1 AND ct_hoadon.TrangThai = 1 AND hoadon.MaKH = "+MaKH+" and hoadon.TrangThaiGiaoHang = 0 and hoadon.TrangThaiXacThuc = 0 GROUP BY ct_hoadon.MaHD",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy CTHD
exports.getCTHD= function(MaHD,callbackQuery){
    connect();
    connection.query("SELECT ct_hoadon.SL,kichthuoc_banh.DonGiaBan,khuyenmai.LoaiKM,khuyenmai.GiaTri,banh.TenBanh,kichthuoc.TenKT FROM ct_hoadon INNER JOIN hoadon ON hoadon.MaHD = ct_hoadon.MaHD INNER JOIN kichthuoc_banh ON kichthuoc_banh.MaKT_Banh = ct_hoadon.MaKT_Banh INNER JOIN kichthuoc ON kichthuoc.MaKT = kichthuoc_banh.MaKT INNER JOIN banh ON banh.MaBanh = kichthuoc_banh.MaBanh LEFT JOIN khuyenmai_banh ON khuyenmai_banh.MaBanh = banh.MaBanh LEFT JOIN khuyenmai ON khuyenmai.MaKM = khuyenmai_banh.MaKM WHERE ct_hoadon.TrangThai = 1 AND ct_hoadon.MaHD = "+MaHD+" AND hoadon.MaKH=1 GROUP BY ct_hoadon.MaCTHD",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}