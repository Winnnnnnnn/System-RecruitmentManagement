package com.main.back.user;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.List;

/**
 * @author 谢晓晓
 * @date 2019/02/24
 * @describe 头像上传路由
 */
@WebServlet(name="img",urlPatterns="/img")
public class FileUpload extends HttpServlet {
    /**
     * 处理图片上传
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //调整编码，防止中文乱码
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        //配置上传参数
        DiskFileItemFactory factory = new DiskFileItemFactory();
        //文件上传处理器
        ServletFileUpload upload = new ServletFileUpload(factory);
        //编码处理
        upload.setHeaderEncoding("utf-8");
        //文件上传路径
        String uploadPath = getServletContext().getRealPath("/") + File.separator + "image/head";
        // 如果目录不存在则创建
        File uploadDir = new File(uploadPath);
        if (!uploadDir.exists()) {
            uploadDir.mkdir();
        }
        String fileName = "";
        try {
            // 解析请求的内容提取文件数据
            @SuppressWarnings("unchecked")
            List<FileItem> formItems = upload.parseRequest(req);
            if (formItems != null && formItems.size() > 0) {
                // 迭代表单数据
                for (FileItem item : formItems) {
                    // 处理不在表单中的字段
                    if (!item.isFormField()) {
                        fileName = new File(new Date().getTime() + "_" +  item.getName()).getName();
                        String filePath = uploadPath + File.separator + fileName;
                        File storeFile = new File(filePath);
                        // 在控制台输出文件的上传路径
                        System.out.println(filePath);
                        // 保存文件到硬盘
                        item.write(storeFile);
                    }
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        PrintWriter printWriter = resp.getWriter();
        printWriter.print(fileName);
    }
}
