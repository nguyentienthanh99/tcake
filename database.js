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


//---------------------------------Loại bánh----------------------------------------------
//lấy tất cả loại bánh DONE
exports.getAllLoaiBanh = function(callbackQuery){
    connect();
    connection.query("SELECT loaibanh.MaLoaiBanh,loaibanh.TenLoaiBanh,loaibanh.AnhLoai,loaibanh.MoTa FROM loaibanh WHERE loaibanh.TrangThai=1",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

// Lấy chi tiết loại bánh DONE
exports.getDetailLoaiBanh = function(MaLoaiBanh,callbackQuery){
    connect();
    connection.query("SELECT loaibanh.MaLoaiBanh,loaibanh.TenLoaiBanh,loaibanh.AnhLoai,loaibanh.MoTa FROM loaibanh WHERE loaibanh.MaLoaiBanh = "+MaLoaiBanh,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Thêm loại bánh DONE
exports.themLoaiBanh = function(TenLoaiBanh, AnhLoai, MoTa,callbackQuery){
    connect();
    connection.query("INSERT INTO loaibanh(TenLoaiBanh,AnhLoai,MoTa) VALUES ('"+TenLoaiBanh+"','"+AnhLoai+"','"+MoTa+"')",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//sửa loại bánh DONE
exports.suaLoaiBanh = function(MaLoaiBanh,TenLoaiBanh, AnhLoai, MoTa,callbackQuery){
    connect();
    connection.query("UPDATE loaibanh SET TenLoaiBanh='"+TenLoaiBanh+"',AnhLoai='"+AnhLoai+"',MoTa='"+MoTa+"' WHERE loaibanh.MaLoaiBanh = "+ MaLoaiBanh,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//xóa loại bánh DONE
exports.xoaLoaiBanh = function(MaLoaiBanh,callbackQuery){
    connect();
    connection.query("UPDATE loaibanh SET TrangThai=0 WHERE loaibanh.MaLoaiBanh = "+MaLoaiBanh,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy list bánh theo loại bánh
exports.getAllBanhTheoLoaiBanh = function(MaLoaiBanh,callbackQuery){
    connect();
    connection.query("SELECT * FROM banh WHERE banh.MaLoaiBanh="+MaLoaiBanh,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//-------------------------------Khách hàng----------------------------------------------

//lấy tất cả khách hàng DONE
exports.getAllKhachHang = function(callbackQuery){
    connect();
    connection.query("SELECT khachhang.MaKH,khachhang.MaTK,khachhang.TenKH,DATE_FORMAT(khachhang.NgaySinh, '%Y-%m-%d') AS NgaySinh, khachhang.GioiTinh,khachhang.SDT,khachhang.Email,khachhang.Anh,khachhang.DiaChi,khachhang.Phuong,khachhang.Quan,khachhang.ThanhPho,khachhang.MatKhau,khachhang.created_at,khachhang.updated_at FROM khachhang",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy chi tiết khách hàng theo mã khách hàng DONE
exports.getKhachHang = function(MaKH,callbackQuery){
    connect();
    connection.query("SELECT khachhang.MaKH,khachhang.MaTK,khachhang.TenKH,DATE_FORMAT(khachhang.NgaySinh, '%Y %m %d') AS NgaySinh, khachhang.GioiTinh,khachhang.SDT,khachhang.Email,khachhang.Anh,khachhang.DiaChi,khachhang.Phuong,khachhang.Quan,khachhang.ThanhPho,khachhang.MatKhau,khachhang.created_at,khachhang.updated_at FROM khachhang WHERE khachhang.MaKH="+MaKH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Thêm khách hàng
exports.themKhachHang = function(MaTK, TenKH, NgaySinh, GioiTinh, SDT, Email, Anh, DiaChi, Phuong, Quan, ThanhPho, MatKhau,callbackQuery){
    connect();
    connection.query("INSERT INTO khachhang(MaTK, TenKH, NgaySinh, GioiTinh, SDT, Email, Anh, DiaChi, Phuong, Quan, ThanhPho, MatKhau) VALUES ("+MaTK+",'"+TenKH+"','"+NgaySinh+"','"+GioiTinh+"','"+SDT+"','"+Email+"','"+Anh+"','"+DiaChi+"','"+Phuong+"','"+Quan+"','"+ThanhPho+"','"+MatKhau+"')",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Sửa khách hàng
exports.suaKhachHang = function(MaKH, NgaySinh, GioiTinh, SDT, Email, Anh, DiaChi, Phuong, Quan, ThanhPho,callbackQuery){
    connect();
    connection.query("UPDATE khachhang SET NgaySinh='"+NgaySinh+"',GioiTinh='"+GioiTinh+"',SDT='"+SDT+"',Email='"+Email+"',Anh='"+Anh+"',DiaChi='"+DiaChi+"',Quan='"+Quan+"',Phuong='"+Phuong+"',ThanhPho='"+ThanhPho+"' WHERE khachhang.MaKH=" + MaKH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}
exports.suaKhachHangDatHang = function(MaKH, TenKH, SDT, Email, DiaChi, Phuong, Quan, ThanhPho,callbackQuery){
    connect();
    connection.query("UPDATE khachhang SET TenKH='"+TenKH+"',SDT='"+SDT+"',Email='"+Email+"',DiaChi='"+DiaChi+"',Phuong='"+Phuong+"',Quan='"+Quan+"',ThanhPho='"+ThanhPho+"' WHERE khachhang.MaKH=" + MaKH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

exports.suaMatKhau = function(MaKH, MatKhau,callbackQuery){
    connect();
    connection.query("UPDATE khachhang SET MatKhau='"+MatKhau+"' WHERE khachhang.MaKH=" + MaKH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Sửa dịa chỉ khách hàng
exports.suaDiaChiKhachHang = function(MaKH, DiaChi, Phuong, Quan, ThanhPho,callbackQuery){
    connect();
    connection.query("UPDATE khachhang SET DiaChi='"+DiaChi+"',Quan='"+Quan+"',Phuong='"+Phuong+"',ThanhPho='"+ThanhPho+"' WHERE khachhang.MaKH=" + MaKH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//xóa khách hàng
exports.xoaKhachHang = function(MaKH,callbackQuery){
    connect();
    connection.query("UPDATE khachhang SET khachhang.TrangThai = 2 WHERE khachhang.MaKH = "+ MaKH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy số lượng hóa đơn khách đã đặt DONE
exports.soHoaDonCuaKhachHang = function(MaKH,callbackQuery){
    connect();
    connection.query("SELECT COUNT(hoadon.MaHD) AS SoHoaDon FROM hoadon WHERE hoadon.TrangThai=1 AND hoadon.MaKH="+ MaKH,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy danh sách hóa đơn của khách
exports.danhSachHoaDonCuaKhachHang = function(MaKH,callbackQuery){
    connect();
    connection.query("SELECT hoadon.MaHD,hoadon.MaKH,khachhang.TenKH,hoadon.TrangThaiGiaoHang,hoadon.TrangThaiThanhToan,hoadon.TrangThaiXacThuc,DATE_FORMAT(hoadon.created_at, '%Y-%m-%d') AS NgayTaoHD,hoadon.GhiChu FROM hoadon INNER JOIN khachhang ON hoadon.MaKH = khachhang.MaKH INNER JOIN ct_hoadon ON hoadon.MaHD = ct_hoadon.MaHD WHERE  khachhang.TrangThai =1 AND ct_hoadon.TrangThai = 1 AND hoadon.MaKH ="+MaKH+" GROUP BY hoadon.MaHD",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//-----------------------------------Bánh--------------------------------------

//banh DONE (Đã thêm trạng thái)
exports.getAllBanh = function(callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,SUM(ct_phieunhap.SL) As SL,SUM(ct_phieunhap.SLTon) AS SLTon,banh.TenBanh,loaibanh.MaLoaiBanh,loaibanh.TenLoaiBanh,loaibanh.TrangThai AS TrangThaiLoaiBanh,banh.AnhSP,banh.HinhDang,banh.MoTa FROM kichthuoc_banh,ct_phieunhap,banh,loaibanh, phieunhap WHERE ct_phieunhap.MaKT_Banh=kichthuoc_banh.MaKT_Banh and banh.MaBanh=kichthuoc_banh.MaBanh and banh.MaLoaiBanh=loaibanh.MaLoaiBanh AND phieunhap.MaPN =ct_phieunhap.MaPN AND ct_phieunhap.TrangThai=1 AND banh.TrangThai = 1 AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) GROUP BY kichthuoc_banh.MaBanh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//banh đã bán  (Đã thêm trạng thái)
exports.getAllBanhDaBan = function(callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,banh.TenBanh,loaibanh.MaLoaiBanh,loaibanh.TenLoaiBanh,loaibanh.TrangThai AS TrangThaiLoaiBanh,banh.AnhSP,banh.HinhDang,banh.MoTa,SUM(ct_hoadon.SL) AS SLBan FROM kichthuoc_banh INNER JOIN banh ON banh.MaBanh=kichthuoc_banh.MaBanh INNER JOIN loaibanh ON banh.MaLoaiBanh=loaibanh.MaLoaiBanh LEFT JOIN ct_hoadon ON kichthuoc_banh.MaKT_Banh = ct_hoadon.MaKT_Banh WHERE ct_hoadon.TrangThai=1 AND banh.TrangThai = 1 GROUP BY kichthuoc_banh.MaBanh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy chi tiết bánh DONE
exports.getDetailBanh= function(MaBanh,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,SUM(ct_phieunhap.SL) As SL,SUM(ct_phieunhap.SLTon) AS SLTon,banh.TenBanh,loaibanh.MaLoaiBanh,loaibanh.TenLoaiBanh,banh.AnhSP,banh.HinhDang,banh.MoTa FROM kichthuoc_banh,ct_phieunhap,banh,loaibanh WHERE ct_phieunhap.MaKT_Banh=kichthuoc_banh.MaKT_Banh and kichthuoc_banh.MaBanh="+MaBanh+" and banh.MaLoaiBanh=loaibanh.MaLoaiBanh AND banh.MaBanh = "+MaBanh+" AND ct_phieunhap.TrangThai=1 AND banh.TrangThai = 1 AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) GROUP BY kichthuoc_banh.MaBanh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy detail Số lượng bánh đã bán
exports.getDetailBanhDaBan= function(MaBanh,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,SUM(ct_hoadon.SL) As SLBan FROM kichthuoc_banh,ct_hoadon,banh WHERE ct_hoadon.MaKT_Banh=kichthuoc_banh.MaKT_Banh  and kichthuoc_banh.MaBanh = banh.MaBanh AND kichthuoc_banh.MaBanh = "+MaBanh+" AND ct_hoadon.TrangThai=1 AND banh.TrangThai = 1 GROUP BY kichthuoc_banh.MaBanh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//các bánh cùng loại
exports.getBanhCungLoai = function(MaLoaiBanh,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,SUM(ct_phieunhap.SL) As SL,banh.TenBanh,loaibanh.TenLoaiBanh, banh.AnhSP FROM kichthuoc_banh,banh,loaibanh,ct_phieunhap WHERE ct_phieunhap.MaKT_Banh=kichthuoc_banh.MaKT_Banh and banh.MaBanh=kichthuoc_banh.MaBanh and banh.MaLoaiBanh=loaibanh.MaLoaiBanh AND ct_phieunhap.TrangThai=1 AND loaibanh.TrangThai=1 AND banh.MaLoaiBanh="+MaLoaiBanh+" AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) GROUP BY kichthuoc_banh.MaBanh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//các bánh search
exports.getBanhSearch = function(TenBanh,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,SUM(ct_phieunhap.SL) As SL,banh.TenBanh,loaibanh.TenLoaiBanh, banh.AnhSP FROM kichthuoc_banh,banh,loaibanh,ct_phieunhap WHERE ct_phieunhap.MaKT_Banh=kichthuoc_banh.MaKT_Banh and banh.MaBanh=kichthuoc_banh.MaBanh and banh.MaLoaiBanh=loaibanh.MaLoaiBanh AND ct_phieunhap.TrangThai=1 AND loaibanh.TrangThai=1 AND banh.TenBanh LIKE '%"+TenBanh+"%' AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) GROUP BY kichthuoc_banh.MaBanh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy list kích thước DONE
exports.getKichThuoc = function(callbackQuery){
    connect();
    connection.query("SELECT MaKT,TenKT,MoTa FROM kichthuoc WHERE 1",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy tên ncc theo bánh DONE (đã thêm trạng thái)
exports.getNCCTheoBanh = function(MaBanh,callbackQuery){
    connect();
    connection.query("SELECT nhacungcap.TenNCC,nhacungcap.MaNCC,nhacungcap.SDT,nhacungcap.Email,nhacungcap.DiaChi,nhacungcap.Phuong,nhacungcap.Quan,nhacungcap.ThanhPho FROM ct_phieunhap INNER JOIN phieunhap ON phieunhap.MaPN=ct_phieunhap.MaPN INNER JOIN kichthuoc_banh ON kichthuoc_banh.MaKT_Banh=ct_phieunhap.MaKT_Banh INNER JOIN nhacungcap ON nhacungcap.MaNCC = phieunhap.MaNCC WHERE ct_phieunhap.TrangThai = 1 AND nhacungcap.TrangThai = 1 AND kichthuoc_banh.MaBanh = "+MaBanh+" GROUP BY phieunhap.MaNCC",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//xóa ncc theo bánh (phiếu nhập) DONE
exports.XoaNCCTrenBanh = function(MaBanh,MaNCC,callbackQuery){
    connect();
    connection.query("UPDATE phieunhap,kichthuoc_banh,ct_phieunhap SET ct_phieunhap.TrangThai=0 WHERE kichthuoc_banh.MaKT_Banh = ct_phieunhap.MaKT_Banh AND ct_phieunhap.MaPN = phieunhap.MaPN AND kichthuoc_banh.MaBanh = "+MaBanh+" AND phieunhap.MaNCC = " + MaNCC,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy hạn sử dụng theo kích thước của từng mã bánh DONE
exports.getHSDKichThuocBanhTheoMaBanh = function(MaBanh,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc.MaKT,ct_phieunhap.MaKT_Banh,kichthuoc.TenKT,DATE_FORMAT(ct_phieunhap.NSX, '%Y-%m-%d') AS NSX,DATE_FORMAT(ct_phieunhap.HSD, '%Y-%m-%d') AS HSD,ct_phieunhap.SL,kichthuoc_banh.DonGiaNhap,kichthuoc_banh.DonGiaBan FROM ct_phieunhap ,kichthuoc,kichthuoc_banh WHERE kichthuoc_banh.MaKT=kichthuoc.MaKT and kichthuoc_banh.MaKT_Banh= ct_phieunhap.MaKT_Banh AND ct_phieunhap.TrangThai = 1 AND kichthuoc_banh.TrangThai = 1 AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) and kichthuoc_banh.MaBanh="+MaBanh,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//xóa hạn sử dụng theo kích thước của từng mã bánh  DONE
exports.xoaHSDKichThuocBanhTheoMaBanh = function(MaKT_Banh,NSX,HSD,callbackQuery){
    connect();
    connection.query("UPDATE ct_phieunhap SET ct_phieunhap.TrangThai = 0 WHERE ct_phieunhap.MaKT_Banh = "+MaKT_Banh+" AND ct_phieunhap.NSX = '"+NSX+"' AND ct_phieunhap.HSD = '"+HSD+"'",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy mã bánh max DONE
exports.MaBanhMax = function(callbackQuery){
    connect();
    connection.query("SELECT MAX(MaBanh) AS MaBanhMax FROM banh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Thêm bánh
// exports.themBanh= function(MaBanh,TenBanh,MaLoaiBanh,AnhSP,HinhDang,MoTa,callbackQuery){
//     connect();
//     connection.query("INSERT INTO banh(MaBanh,TenBanh, MaLoaiBanh, AnhSP, HinhDang, MoTa) VALUES ('"+MaBanh+"','"+TenBanh+"',"+MaLoaiBanh+",'"+AnhSP+"','"+HinhDang+"','"+MoTa+"')",function(err, results, fields){
//         if(!err){
//                 callbackQuery(results);
//             }else console.log(err);
//         })
// }

//Thêm bánh DONE
exports.themBanh= function(MaBanh,TenBanh,MaLoaiBanh,AnhSP,HinhDang,MoTa,callbackQuery){
    connect();
    connection.query("INSERT INTO banh(MaBanh,TenBanh, MaLoaiBanh, AnhSP, HinhDang, MoTa) VALUES ("+MaBanh+",'"+TenBanh+"',"+MaLoaiBanh+",'"+AnhSP+"','"+HinhDang+"','"+MoTa+"')",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//sửa bánh DONE
exports.suaBanh= function(MaBanh,TenBanh,MaLoaiBanh,AnhSP,HinhDang,MoTa,callbackQuery){
    connect();
    connection.query("UPDATE banh SET TenBanh='"+TenBanh+"',MaLoaiBanh="+MaLoaiBanh+",AnhSP='"+AnhSP+"',HinhDang='"+HinhDang+"',MoTa='"+MoTa+"' WHERE banh.MaBanh = "+MaBanh,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

// Xóa bánh DONE
exports.xoaBanh= function(MaBanh,callbackQuery){
    connect();
    connection.query("UPDATE banh SET banh.TrangThai=0 WHERE banh.MaBanh = "+MaBanh,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//

//---------------------------------------Hóa đơn nhập----------------------------
//lấy list hóa đơn nhập DONE
exports.getAllHoaDonNhap = function(callbackQuery){
    connect();
    connection.query("SELECT phieunhap.MaPN,phieunhap.MaAD,admin.TenAD AS TenNguoiNhap,phieunhap.MaNCC,nhacungcap.TenNCC,DATE_FORMAT(phieunhap.created_at, '%Y-%m-%d') AS NgayTaoPN,SUM(ct_phieunhap.SL) AS SL FROM phieunhap INNER JOIN nhacungcap ON phieunhap.MaNCC=nhacungcap.MaNCC INNER JOIN admin ON phieunhap.MaAD=admin.MaAD INNER JOIN ct_phieunhap ON phieunhap.MaPN = ct_phieunhap.MaPN WHERE nhacungcap.TrangThai = 1  AND ct_phieunhap.TrangThai = 1 GROUP BY phieunhap.MaPN",function(err,results, _fields){
        if(!err){
            callbackQuery(results);
        }else console.log(err);
    })
}

//lấy chi tiết hóa đơn nhập DONE
exports.getDetailHoaDonNhap = function(MaPN,callbackQuery){
    connect();
    connection.query("SELECT phieunhap.MaPN,admin.TenAD AS TenNguoiNhap,admin.MaAD,nhacungcap.MaNCC,nhacungcap.TenNCC,SUM(ct_phieunhap.SL*kichthuoc_banh.DonGiaNhap) AS ThanhTien,DATE_FORMAT(phieunhap.created_at, '%Y-%m-%d') AS NgayTaoPN,phieunhap.GhiChu FROM phieunhap INNER JOIN admin ON phieunhap.MaAD = admin.MaAD INNER JOIN nhacungcap ON nhacungcap.MaNCC = phieunhap.MaNCC INNER JOIN ct_phieunhap ON phieunhap.MaPN = ct_phieunhap.MaPN INNER JOIN kichthuoc_banh ON kichthuoc_banh.MaKT_Banh = ct_phieunhap.MaKT_Banh WHERE phieunhap.MaPN =" +MaPN,function(err,results, _fields){
        if(!err){
            callbackQuery(results);
        }else console.log(err);
    })
}

//Thêm hóa đơn nhập bỏ
exports.themHoaDonNhap= function(MaAD,MaNCC,GhiChu,callbackQuery){
    connect();
    connection.query("INSERT INTO phieunhap(MaAD, MaNCC, GhiChu) VALUES ("+MaAD+","+MaNCC+",'"+GhiChu+"')",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Mã phiếu nhập lớn nhất DONE
exports.MaPNMax= function(callbackQuery){
    connect();
    connection.query("SELECT MAX(phieunhap.MaPN) AS MaPNMax FROM phieunhap",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy List AD DONE
exports.getListAD= function(callbackQuery){
    connect();
    connection.query("SELECT admin.MaAD,admin.MaTK,admin.Anh,admin.TenAD,admin.MatKhau FROM admin",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Update hóa đơn nhập (thêm HDN) DONE
exports.taoHoaDonNhap= function(MaPN,MaAD,MaNCC,callbackQuery){
    connect();
    connection.query("INSERT INTO phieunhap(MaPN,MaAD,MaNCC) VALUES ("+MaPN+","+MaAD+","+MaNCC+")",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Thêm chi tiết phiếu nhập DONE
exports.themCTPhieuNhap = function(MaPN,MaKT_Banh,NSX,HSD,SL,GhiChu,callbackQuery){
    connect();
    connection.query("INSERT INTO ct_phieunhap(MaPN,MaKT_Banh,NSX,HSD,SL,SLTon,GhiChu) VALUES ("+MaPN+","+MaKT_Banh+",'"+NSX+"','"+HSD+"',"+SL+","+SL+",'"+GhiChu+"')",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}


//Thêm kích thước + bánh mới DONE
exports.themKichThuocBanh= function(MaKT_Banh,MaBanh,MaKT,DonGiaNhap,DonGiaBan,callbackQuery){
    connect();
    connection.query("INSERT INTO kichthuoc_banh(MaKT_Banh,MaBanh, MaKT, DonGiaNhap, DonGiaBan) VALUES ("+MaKT_Banh+","+MaBanh+","+MaKT+","+DonGiaNhap+","+DonGiaBan+")",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Mã kích thước bánh lớn nhất DONE
exports.MaKTBanhMax= function(callbackQuery){
    connect();
    connection.query("SELECT MAX(kichthuoc_banh.MaKT_Banh) AS MaKT_Banh FROM kichthuoc_banh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}



//Xóa kích thước + bánh
exports.xoaKichThuocBanh= function(MaKT_Banh,callbackQuery){
    connect();
    connection.query("UPDATE kichthuoc_banh SET TrangThai=0 WHERE kichthuoc_banh.MaKT_Banh="+MaKT_Banh,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//lấy detail HDN DONE
exports.getListCTPN = function(MaPN,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,ct_phieunhap.MaKT_Banh,kichthuoc.MaKT,kichthuoc.TenKT,DATE_FORMAT(ct_phieunhap.NSX, '%Y-%m-%d') AS NSX,DATE_FORMAT(ct_phieunhap.HSD, '%Y-%m-%d') AS HSD,ct_phieunhap.SL,kichthuoc_banh.DonGiaNhap,kichthuoc_banh.DonGiaBan FROM ct_phieunhap ,kichthuoc,kichthuoc_banh WHERE kichthuoc_banh.MaKT=kichthuoc.MaKT and kichthuoc_banh.MaKT_Banh= ct_phieunhap.MaKT_Banh AND ct_phieunhap.TrangThai = 1 AND kichthuoc_banh.TrangThai = 1 and ct_phieunhap.MaPN="+MaPN+" ORDER BY `HSD` ASC",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Xóa nhiều kích thước + bánh theo mã bánh
// exports.xoaNhieuKichThuocBanh= function(MaBanh,callbackQuery){
//     connect();
//     connection.query("UPDATE kichthuoc_banh SET TrangThai=2 WHERE kichthuoc_banh.MaBanh="+MaBanh,function(err, results, fields){
//         if(!err){
//                 callbackQuery(results);
//             }else console.log(err);
//         })
// }

//--------------------------------------Hóa đơn xuất-------------------------------------
//Lấy list hóa đơn xuất DONE
exports.getAllHoaDonXuat= function(callbackQuery){
    connect();
    connection.query("SELECT hoadon.MaHD,hoadon.MaKH,khachhang.TenKH,hoadon.TrangThaiGiaoHang,hoadon.TrangThaiThanhToan,hoadon.TrangThaiXacThuc,hoadon.created_at AS NgayTaoHD,hoadon.GhiChu FROM hoadon INNER JOIN khachhang ON hoadon.MaKH = khachhang.MaKH INNER JOIN ct_hoadon ON hoadon.MaHD = ct_hoadon.MaHD WHERE  khachhang.TrangThai =1 AND ct_hoadon.TrangThai = 1 GROUP BY hoadon.MaHD ORDER BY hoadon.MaHD ASC",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy chi tiết hóa đơn DONE
exports.getDetailHoaDonXuat= function(MaHD,callbackQuery){
    connect();
    connection.query("SELECT hoadon.MaHD,hoadon.MaKH,hoadon.SoTienConLai,khachhang.TenKH,hoadon.TrangThaiGiaoHang,hoadon.TrangThaiThanhToan,hoadon.TrangThaiXacThuc,hoadon.created_at AS NgayTaoHD,hoadon.GhiChu FROM hoadon INNER JOIN khachhang ON hoadon.MaKH = khachhang.MaKH INNER JOIN ct_hoadon ON hoadon.MaHD = ct_hoadon.MaHD WHERE  khachhang.TrangThai =1 AND ct_hoadon.TrangThai = 1 AND hoadon.MaHD = " + MaHD +" GROUP BY ct_hoadon.MaHD",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy list chi tiết hóa đơn DONE
// exports.getListCTHD= function(MaHD,callbackQuery){
//     connect();
//     connection.query("SELECT  kichthuoc_banh.MaBanh,kichthuoc_banh.MaKT_Banh,kichthuoc.TenKT,ct_hoadon.SL,kichthuoc_banh.DonGiaBan,khuyenmai.GiaTri,khuyenmai.LoaiKM,ct_hoadon.GhiChu,DATE_FORMAT(khuyenmai.ThoiGianKetThuc, '%Y-%m-%d') AS ThoiGianKetThuc,DATE_FORMAT(khuyenmai.ThoiGianBatDau, '%Y-%m-%d') AS ThoiGianBatDau FROM ct_hoadon INNER JOIN kichthuoc_banh ON ct_hoadon.MaKT_Banh = kichthuoc_banh.MaKT_Banh INNER JOIN kichthuoc ON kichthuoc_banh.MaKT = kichthuoc.MaKT INNER JOIN banh ON banh.MaBanh = kichthuoc_banh.MaBanh LEFT JOIN khuyenmai_banh ON banh.MaBanh = khuyenmai_banh.MaBanh LEFT JOIN khuyenmai ON khuyenmai.MaKM = khuyenmai_banh.MaKM WHERE ct_hoadon.MaHD="+MaHD+" and ct_hoadon.TrangThai=1 AND banh.TrangThai=1",function(err, results, fields){
//         if(!err){
//                 callbackQuery(results);
//             }else console.log(err);
//         })
// }
exports.getListCTHD= function(MaHD,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,kichthuoc_banh.MaKT_Banh,kichthuoc.TenKT,ct_hoadon.SL,kichthuoc_banh.DonGiaBan,khuyenmai.GiaTri,khuyenmai.LoaiKM,ct_hoadon.GhiChu,DATE_FORMAT(khuyenmai.ThoiGianKetThuc, '%Y-%m-%d') AS ThoiGianKetThuc,DATE_FORMAT(khuyenmai.ThoiGianBatDau, '%Y-%m-%d') AS ThoiGianBatDau FROM ct_hoadon INNER JOIN kichthuoc_banh ON ct_hoadon.MaKT_Banh = kichthuoc_banh.MaKT_Banh INNER JOIN kichthuoc ON kichthuoc_banh.MaKT = kichthuoc.MaKT INNER JOIN banh ON banh.MaBanh = kichthuoc_banh.MaBanh LEFT JOIN khuyenmai_banh ON banh.MaBanh = khuyenmai_banh.MaBanh LEFT JOIN khuyenmai ON khuyenmai.MaKM = khuyenmai_banh.MaKM WHERE ct_hoadon.MaHD="+MaHD+" and ct_hoadon.TrangThai=1 AND banh.TrangThai=1",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}


//xác thực đơn hàng DONE
exports.xacThucDonHang= function(MaHD,callbackQuery){
    connect();
    connection.query("UPDATE hoadon SET TrangThaiXacThuc=1 WHERE hoadon.MaHD = "+MaHD,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

// Xác thực giao hàng DONE
exports.xacThucGiaoHang= function(MaHD,callbackQuery){
    connect();
    connection.query("UPDATE hoadon SET TrangThaiGiaoHang=1 WHERE hoadon.MaHD = "+MaHD,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

// Xác thực thanh toán DONE
exports.xacThucThanhToan= function(MaHD,callbackQuery){
    connect();
    connection.query("UPDATE hoadon SET TrangThaiThanhToan=1,SoTienConLai=0 WHERE hoadon.MaHD = "+MaHD,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Số tiền còn lại DONE
exports.datCoc= function(MaHD,SoTienConLai,callbackQuery){
    connect();
    connection.query("UPDATE hoadon SET SoTienConLai="+SoTienConLai+" WHERE hoadon.MaHD = "+MaHD,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//------------------------------------Nhà cung cấp----------------------------------------

//Thêm nhà cung cấp DONE
exports.themNCC = function(TenNCC,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,callbackQuery){
    connect();
    connection.query("INSERT INTO nhacungcap(TenNCC,SDT,Email,DiaChi,Phuong,Quan,ThanhPho) VALUES ('"+TenNCC+"','"+SDT+"','"+Email+"','"+DiaChi+"','"+Phuong+"','"+Quan+"','"+ThanhPho+"')",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy tất cả NCC DONE
exports.getAllNCC = function(callbackQuery){
    connect();
    connection.query("SELECT nhacungcap.TenNCC,nhacungcap.MaNCC,nhacungcap.SDT,nhacungcap.Email,nhacungcap.DiaChi,nhacungcap.Phuong,nhacungcap.Quan,nhacungcap.ThanhPho FROM nhacungcap WHERE nhacungcap.TrangThai = 1",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy chi tiết NCC DONE
exports.getDetailNCC = function(MaNCC,callbackQuery){
    connect();
    connection.query("SELECT nhacungcap.TenNCC,nhacungcap.MaNCC,nhacungcap.SDT,nhacungcap.Email,nhacungcap.DiaChi,nhacungcap.Phuong,nhacungcap.Quan,nhacungcap.ThanhPho FROM nhacungcap WHERE nhacungcap.TrangThai = 1 and nhacungcap.MaNCC="+MaNCC,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Sửa NCC DONE
exports.suaNCC = function(MaNCC,TenNCC,SDT,Email,DiaChi,Phuong,Quan,ThanhPho,callbackQuery){
    connect();
    connection.query("UPDATE nhacungcap SET nhacungcap.TenNCC='"+TenNCC+"',nhacungcap.SDT='"+SDT+"',nhacungcap.Email='"+Email+"',nhacungcap.DiaChi='"+DiaChi+"',nhacungcap.Phuong='"+Phuong+"',nhacungcap.Quan='"+Quan+"',nhacungcap.ThanhPho='"+ThanhPho+"' WHERE nhacungcap.MaNCC = "+MaNCC,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Xóa NCC DONE
exports.XoaNCC = function(MaNCC,callbackQuery){
    connect();
    connection.query("UPDATE nhacungcap SET nhacungcap.TrangThai = 0 WHERE MaNCC="+MaNCC,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}


//------------------------------------------Khuyến Mại--------------------------------
//Lấy khuyến mại DONE
exports.getAllKhuyenMai = function(callbackQuery){
    connect();
    connection.query("SELECT MaKM, TieuDe, GiaTri, LoaiKM, ThoiGianBatDau, ThoiGianKetThuc, MoTa, created_at FROM khuyenmai WHERE khuyenmai.TrangThai = 1",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy bánh chưa khuyến mại DONE
exports.getBanhChuaKM = function(callbackQuery){
    connect();
    connection.query("SELECT banh.MaBanh,banh.TenBanh,khuyenmai.MaKM,khuyenmai.ThoiGianBatDau,khuyenmai.ThoiGianKetThuc FROM banh LEFT JOIN khuyenmai_banh ON khuyenmai_banh.MaBanh = banh.MaBanh LEFT JOIN khuyenmai ON khuyenmai_banh.MaKM = khuyenmai.MaKM",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy chi tiết khuyến mại DONE
exports.getDetailKhuyenMai = function(MaKM,callbackQuery){
    connect();
    connection.query("SELECT MaKM, TieuDe, AnhKM, GiaTri, LoaiKM, DATE_FORMAT(ThoiGianBatDau, '%Y-%m-%d') AS ThoiGianBatDau, DATE_FORMAT(ThoiGianKetThuc, '%Y-%m-%d') AS ThoiGianKetThuc, MoTa, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_at FROM khuyenmai WHERE khuyenmai.MaKM = "+MaKM,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Thêm khuyến mại DONE
exports.themKM = function(TieuDe,AnhKM,GiaTri,LoaiKM,ThoiGianBatDau,ThoiGianKetThuc,MoTa,callbackQuery){
    connect();
    connection.query("INSERT INTO khuyenmai(TieuDe,AnhKM,GiaTri,LoaiKM,ThoiGianBatDau,ThoiGianKetThuc,MoTa) VALUES ('"+TieuDe+"','"+AnhKM+"',"+GiaTri+",'"+LoaiKM+"','"+ThoiGianBatDau+"','"+ThoiGianKetThuc+"','"+MoTa+"')",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Thêm bánh vào khuyến mại DONE
exports.themBanhVaoKM = function(MaBanh,MaKM,callbackQuery){
    connect();
    connection.query("INSERT INTO khuyenmai_banh (MaBanh, MaKM) VALUES ("+MaBanh+","+MaKM+")",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy list bánh khuyến mại DONE
exports.getBanhKM = function(MaKM,callbackQuery){
    connect();
    connection.query("SELECT kichthuoc_banh.MaBanh,banh.TenBanh,banh.AnhSP,loaibanh.MaLoaiBanh,loaibanh.TenLoaiBanh,banh.HinhDang FROM kichthuoc_banh,ct_phieunhap,banh,loaibanh, phieunhap, khuyenmai_banh WHERE ct_phieunhap.MaKT_Banh=kichthuoc_banh.MaKT_Banh and banh.MaBanh=kichthuoc_banh.MaBanh and banh.MaLoaiBanh=loaibanh.MaLoaiBanh AND phieunhap.MaPN =ct_phieunhap.MaPN AND ct_phieunhap.TrangThai=1 AND banh.TrangThai = 1 AND banh.MaBanh = khuyenmai_banh.MaBanh AND khuyenmai_banh.MaKM="+MaKM+" AND (NOW() BETWEEN ct_phieunhap.NSX AND ct_phieunhap.HSD) GROUP BY kichthuoc_banh.MaBanh",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//sửa khuyến mại DONE
exports.suaKM = function(TieuDe,GiaTri,LoaiKM,ThoiGianBatDau,ThoiGianKetThuc,MoTa,MaKM,callbackQuery){
    connect();
    connection.query("UPDATE khuyenmai SET TieuDe='"+TieuDe+"',GiaTri="+GiaTri+",LoaiKM='"+LoaiKM+"',ThoiGianBatDau='"+ThoiGianBatDau+"',ThoiGianKetThuc='"+ThoiGianKetThuc+"',MoTa='"+MoTa+"' WHERE MaKM ="+MaKM,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//xóa khuyến mãi DONE
exports.xoaKM = function(_TrangThai,MaKM,callbackQuery){
    connect();
    connection.query("UPDATE khuyenmai SET TrangThai=0 WHERE MaKM = "+MaKM,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}


// ------------------------------Báo cáo-------------------
//Lấy tổng háo đơn theo tháng
exports.tongGiaTriHoaDon = function(Thang,Nam,callbackQuery){
    connect();
    connection.query("SELECT ct_hoadon.SL,kichthuoc_banh.DonGiaBan,khuyenmai.GiaTri,khuyenmai.LoaiKM FROM kichthuoc_banh INNER JOIN banh ON kichthuoc_banh.MaBanh = banh.MaBanh INNER JOIN ct_hoadon ON ct_hoadon.MaKT_Banh = kichthuoc_banh.MaKT_Banh INNER JOIN hoadon ON hoadon.MaHD = ct_hoadon.MaHD LEFT JOIN khuyenmai_banh ON khuyenmai_banh.MaBanh=banh.MaBanh LEFT JOIN khuyenmai ON khuyenmai.MaKM = khuyenmai_banh.MaKM WHERE  ct_hoadon.TrangThai=1 AND hoadon.TrangThaiXacThuc=1 AND MONTH(ct_hoadon.created_at) = "+Thang+" AND YEAR(ct_hoadon.created_at) = "+Nam,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy hóa đơn 
exports.allGiaTriHoaDon = function(callbackQuery){
    connect();
    connection.query("SELECT ct_hoadon.SL,kichthuoc_banh.DonGiaBan,khuyenmai.GiaTri,khuyenmai.LoaiKM, DATE_FORMAT(ct_hoadon.created_at, '%Y-%m-%d') AS NgayTao FROM kichthuoc_banh INNER JOIN banh ON kichthuoc_banh.MaBanh = banh.MaBanh INNER JOIN ct_hoadon ON ct_hoadon.MaKT_Banh = kichthuoc_banh.MaKT_Banh INNER JOIN hoadon ON hoadon.MaHD = ct_hoadon.MaHD LEFT JOIN khuyenmai_banh ON khuyenmai_banh.MaBanh=banh.MaBanh LEFT JOIN khuyenmai ON khuyenmai.MaKM = khuyenmai_banh.MaKM WHERE  ct_hoadon.TrangThai=1 AND hoadon.TrangThaiXacThuc=1",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy tổng hóa đơn nhập theo tháng
exports.tongGiaTriHoaDonNhap = function(Thang,Nam,callbackQuery){
    connect();
    connection.query("SELECT ct_phieunhap.SL,ct_phieunhap.SLTon,kichthuoc_banh.DonGiaNhap,DATE_FORMAT(ct_phieunhap.NSX, '%Y-%m-%d') AS NSX,DATE_FORMAT(ct_phieunhap.HSD, '%Y-%m-%d') AS HSD FROM kichthuoc_banh INNER JOIN banh ON kichthuoc_banh.MaBanh = banh.MaBanh INNER JOIN ct_phieunhap ON ct_phieunhap.MaKT_Banh = kichthuoc_banh.MaKT_Banh WHERE  ct_phieunhap.TrangThai=1  AND MONTH(ct_phieunhap.created_at) = "+Thang+" AND YEAR(ct_phieunhap.created_at) = "+ Nam,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy hóa đơn nhập
exports.allGiaTriHoaDonNhap = function(callbackQuery){
    connect();
    connection.query("SELECT ct_phieunhap.SL,kichthuoc_banh.DonGiaNhap,DATE_FORMAT(ct_phieunhap.NSX, '%Y-%m-%d') AS NSX,DATE_FORMAT(ct_phieunhap.HSD, '%Y-%m-%d') AS HSD,DATE_FORMAT(ct_phieunhap.created_at, '%Y-%m-%d') AS NgayTao FROM kichthuoc_banh INNER JOIN banh ON kichthuoc_banh.MaBanh = banh.MaBanh INNER JOIN ct_phieunhap ON ct_phieunhap.MaKT_Banh = kichthuoc_banh.MaKT_Banh WHERE  ct_phieunhap.TrangThai=1",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy doanh thu vứt
exports.getDoanhThu = function(Thang,callbackQuery){
    connect();
    connection.query("SELECT SUM(ct_hoadon.SL*kichthuoc_banh.DonGiaBan) AS DoanhThu,MONTH(ct_hoadon.created_at) AS Thang,Year(ct_hoadon.created_at) AS Nam,hoadon.MaHD, DATE_FORMAT(ct_hoadon.created_at, '%Y-%m-%d') AS NgayTao FROM ct_hoadon INNER JOIN kichthuoc_banh ON kichthuoc_banh.MaKT_Banh = ct_hoadon.MaKT_Banh INNER JOIN hoadon ON hoadon.MaHD = ct_hoadon.MaHD WHERE ct_hoadon.TrangThai = 1 AND kichthuoc_banh.TrangThai = 1 AND hoadon.TrangThaiXacThuc = 1 AND hoadon.TrangThaiGiaoHang=1 AND hoadon.TrangThaiThanhToan=1 AND Year(ct_hoadon.created_at) = Year(NOW()) AND MONTH(ct_hoadon.created_at) = "+Thang,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//Lấy vốn vứt
exports.getVon = function(Thang,callbackQuery){
    connect();
    connection.query("SELECT SUM(ct_phieunhap.SL*kichthuoc_banh.DonGiaBan) AS Von,MONTH(ct_phieunhap.created_at) AS Thang,Year(ct_phieunhap.created_at) AS Nam,phieunhap.MaPN, DATE_FORMAT(ct_phieunhap.created_at, '%Y-%m-%d') AS NgayTao FROM ct_phieunhap INNER JOIN kichthuoc_banh ON kichthuoc_banh.MaKT_Banh = ct_phieunhap.MaKT_Banh INNER JOIN phieunhap ON phieunhap.MaPN = ct_phieunhap.MaPN WHERE ct_phieunhap.TrangThai = 1 AND kichthuoc_banh.TrangThai = 1 AND Year(ct_phieunhap.created_at) = Year(NOW()) AND  MONTH(ct_phieunhap.created_at) ="+Thang,function(err, results, fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}


//------------------------Login---------------
//login ad
exports.checkLogin = function(TenAD,MatKhau,callbacklogin){
    connect();
    connection.query("SELECT admin.MaAD,admin.MaTK,admin.Anh,admin.TenAD,admin.MatKhau,admin.checkLogin FROM admin WHERE admin.TenAD='"+TenAD+"' AND admin.MatKhau = '"+MatKhau+"'",function(err, results, fields){
        try {
            callbacklogin(results);
        }
        catch (error){
            console.log("không tồn tại");
        }
        
    })
}

//thêm ad
exports.themAdmin = function(Anh,TenAD,MatKhau,callbackQuery){
    connect();
    connection.query("INSERT INTO admin(MaTK, Anh, TenAD, MatKhau) VALUES (1,'"+Anh+"','"+TenAD+"','"+MatKhau+"')",function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//xóa ad
exports.xoaAdmin = function(MaAD,callbackQuery){
    connect();
    connection.query("UPDATE admin SET CheckLogin=0 WHERE admin.MaAD = "+MaAD,function(err, results, _fields){
        if(!err){
                callbackQuery(results);
            }else console.log(err);
        })
}

//list ad
exports.getListAD = function(callbackQuery){
    connect();
    connection.query("SELECT admin.MaAD,admin.MaTK,admin.Anh,admin.TenAD,admin.MatKhau FROM admin Where admin.CheckLogin = 1",function(err, results, _fields){
        if(!err){
            callbackQuery(results);
        }
        else {
            console.log("không tồn tại");
        }
    })
}

//get ad
exports.getAD = function(MaAD,callbackQuery){
    connect();
    connection.query("SELECT admin.Anh,admin.TenAD,admin.MatKhau FROM admin WHERE admin.MaAD="+MaAD,function(err, results, _fields){
        if(!err){
            callbackQuery(results);
        }
        else {
            console.log("không tồn tại");
        }
    })
}

// login
exports.login = function(CheckLogin,TenAD,callbackQuery){
    connect();
    connection.query("UPDATE admin SET CheckLogin="+CheckLogin+" WHERE admin.TenAD = '"+TenAD+"'",function(err, results, _fields){
        if(!err){
            callbackQuery(results);
        }
        else {
            console.log(err);
        }
    })
}

// //-----------------------------------giỏ hàng-----------------------
// //Giỏ hàng
// exports.getGioHang = function(MaKH,callbackQuery){
//     connect();
//     connection.query("SELECT kichthuoc.TenKT,kichthuoc_banh.MaBanh,giohang.MaKT_Banh,giohang.MaKH,SUM(giohang.SL) AS SL,banh.TenBanh,kichthuoc_banh.DonGiaBan,banh.AnhSP,khuyenmai.GiaTri,khuyenmai.LoaiKM, ct_phieunhap.NSX,MIN(ct_phieunhap.HSD) as HSD FROM giohang INNER JOIN khachhang ON giohang.MaKH = khachhang.MaKH INNER JOIN kichthuoc_banh ON kichthuoc_banh.MaKT_Banh = giohang.MaKT_Banh INNER JOIN banh ON kichthuoc_banh.MaBanh = banh.MaBanh INNER JOIN kichthuoc ON kichthuoc.MaKT = kichthuoc_banh.MaKT INNER JOIN ct_phieunhap ON ct_phieunhap.MaKT_Banh = kichthuoc_banh.MaKT_Banh LEFT JOIN khuyenmai_banh ON khuyenmai_banh.MaBanh = banh.MaBanh LEFT JOIN khuyenmai ON khuyenmai.MaKM = khuyenmai_banh.MaKM WHERE giohang.MaKH = "+MaKH+" AND ct_phieunhap.NSX < NOW() AND ct_phieunhap.HSD > NOW() GROUP BY giohang.MaKT_Banh",function(err, results, _fields){
//         if(!err){
//                 callbackQuery(results);
//             }else console.log(err);
//         })
// }

// //SL banh max
// exports.getSLBanhMax = function(MaBanh,callbackQuery){
//     connect();
//     connection.query("SELECT kichthuoc_banh.MaBanh,giohang.MaKT_Banh,giohang.MaKH,SUM(giohang.SL) AS SL,banh.TenBanh,kichthuoc_banh.DonGiaBan,banh.AnhSP,khuyenmai.GiaTri,khuyenmai.LoaiKM, ct_phieunhap.NSX,MIN(ct_phieunhap.HSD) as HSD FROM giohang INNER JOIN khachhang ON giohang.MaKH = khachhang.MaKH INNER JOIN kichthuoc_banh ON kichthuoc_banh.MaKT_Banh = giohang.MaKT_Banh INNER JOIN banh ON kichthuoc_banh.MaBanh = banh.MaBanh INNER JOIN ct_phieunhap ON ct_phieunhap.MaKT_Banh = kichthuoc_banh.MaKT_Banh LEFT JOIN khuyenmai_banh ON khuyenmai_banh.MaBanh = banh.MaBanh LEFT JOIN khuyenmai ON khuyenmai.MaKM = khuyenmai_banh.MaKM WHERE giohang.MaKH = "+MaKH+" AND ct_phieunhap.NSX < NOW() AND ct_phieunhap.HSD > NOW() GROUP BY giohang.MaKT_Banh",function(err, results, _fields){
//         if(!err){
//                 callbackQuery(results);
//             }else console.log(err);
//         })
// }

