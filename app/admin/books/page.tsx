"use client";

import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { useInvalidate } from "@refinedev/core";
import { Table, Space, Tag, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { supabase, getErrorMessage } from "../../lib/supabaseClient";

export default function BookList() {
  const { tableProps } = useTable({ resource: "books" });
  
  // Tabloyu manuel olarak yenilemek için invalidate hook'unu kullanıyoruz
  const invalidate = useInvalidate();

  // Excel dosyasını işleyen fonksiyon
  const handleFileUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          // 1. Excel'i oku ve JSON'a çevir
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0]; // İlk sekmeyi al
          const sheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(sheet);

          if (parsedData.length === 0) {
            message.warning("Excel dosyası boş!");
            return;
          }

          // 2. Verileri Supabase tablomuza uygun hale getir
          // Excel'deki sütun isimlerinin tam olarak bu şekilde olması beklenir (Büyük/küçük harf duyarlıdır)
          const booksToInsert = parsedData.map((row: any) => ({
            title: row['title'] || row['Kitap Adı'],
            author: row['author'] || row['Yazar'],
            genre: row['genre'] || row['Tür'],
            language: row['language'] || row['Dil'],
            page_count: Number(row['page_count'] || row['Sayfa Sayısı'] || 0),
            stock: Number(row['stock'] || row['Stok'] || 0),
            price: Number(row['price'] || row['Fiyat'] || 0)
          }));

          // 3. Supabase'e Toplu (Bulk) Insert işlemi
          const { error } = await supabase.from('books').insert(booksToInsert);
          
          if (error) throw error;

          message.success(`${booksToInsert.length} kitap başarıyla yüklendi!`);
          
          // Tablodaki verileri yeniden çek
          invalidate({
            resource: "books",
            invalidates: ["list"],
          });

        } catch (err: unknown) {
          // İstemci ve veritabanı hatalarını güvenli yakalama
          message.error(`Veritabanı İşlemi Başarısız: ${getErrorMessage(err)}`);
        }
      };

      reader.readAsArrayBuffer(file);
      
      // Antd'nin kendi yükleme işlemini durduruyoruz, kontrol tamamen bizde
      return false; 
    } catch (err: unknown) {
      // Dosya okuma hatalarını güvenli yakalama
      message.error(`Dosya okunamadı: ${getErrorMessage(err)}`);
      return false;
    }
  };

  return (
    <List
      headerButtons={() => (
        <Space>
          <Upload 
            beforeUpload={handleFileUpload} 
            showUploadList={false} 
            accept=".xlsx, .xls"
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Excel ile Toplu Yükle
            </Button>
          </Upload>
        </Space>
      )}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Kitap Adı" />
        <Table.Column dataIndex="author" title="Yazar" />
        <Table.Column dataIndex="genre" title="Tür" />
        <Table.Column 
          dataIndex="stock" 
          title="Stok" 
          render={(value) => (
            <Tag color={value < 30 ? "red" : "green"}>
              {value} Adet
            </Tag>
          )}
        />
        <Table.Column 
          dataIndex="price" 
          title="Fiyat" 
          render={(value) => `${value} TL`}
        />
        <Table.Column
          title="İşlemler"
          render={(_, record: any) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}