from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import QMainWindow, QFileDialog, QColorDialog
from PyQt5.QtGui import QClipboard, QPixmap, QImage, qRgb, QGuiApplication
from PIL.ImageQt import ImageQt
from form import Ui_MainWindow
from asciiart import converter

class App(QMainWindow, Ui_MainWindow):
    def __init__(self) -> None:
        super().__init__()
        self.setupUi(self)

        self.sc: float = 0.1
        self.gcf: int = 1
        self.bgcolor = 'white'
        self.image_path: str = ''
        self.greyscale: bool = False
        self.more_shades: bool = True

        defaultImage: QImage =  QImage(1, 1, QImage.Format_RGB32)
        defaultImage.setPixel(0, 0, qRgb(255, 255, 255))
        self.srcPixMap: QPixmap = QPixmap(defaultImage).scaled(self.srcImageLabel.size(), Qt.KeepAspectRatio, Qt.SmoothTransformation)
        self.asciiPixMap: QPixmap = QPixmap(defaultImage).scaled(self.asciiImageLabel.size(), Qt.KeepAspectRatio, Qt.SmoothTransformation)
        self.srcImageLabel.setPixmap(self.srcPixMap)
        self.asciiImageLabel.setPixmap(self.asciiPixMap)
        
        self.loadImageButton.clicked.connect(self.open_dialog_box)
        self.scSlider.sliderReleased.connect(self.refresh_images)
        self.scSlider.valueChanged.connect(self.sc_changed)
        self.gcfSlider.sliderReleased.connect(self.refresh_images)
        self.gcfSlider.valueChanged.connect(self.gcf_changed)
        self.bgColorPick.clicked.connect(self.color_picker)
        self.greyscaleCheck.stateChanged.connect(self.greyscale_changed)
        self.moreShades.stateChanged.connect(self.shades_changed)

        self.copyImageButton.setEnabled(False)
        self.copyImageButton.clicked.connect(self.copy_image)
        self.copyTextButton.setEnabled(False)
        self.copyTextButton.clicked.connect(self.copy_text)
        self.saveImageButton.setEnabled(False)
        self.saveImageButton.clicked.connect(self.open_save_as)

        self.clipboard: QClipboard = QGuiApplication.clipboard()

    def resizeEvent(self, event):
        srcScaled = self.srcPixMap.scaled(self.srcImageLabel.size(), Qt.KeepAspectRatio, Qt.SmoothTransformation)
        self.srcImageLabel.setPixmap(srcScaled)
        asciiScaled = self.asciiPixMap.scaled(self.asciiImageLabel.size(), Qt.KeepAspectRatio, Qt.SmoothTransformation)
        self.asciiImageLabel.setPixmap(asciiScaled)

    def open_dialog_box(self) -> None:
        filename = QFileDialog.getOpenFileName(self, 'Open a file', '', "Images (*.png *.xpm *.jpg)")
        path = filename[0]
        self.image_path = path
        self.refresh_images()
        self.saveImageButton.setEnabled(True)
        self.copyImageButton.setEnabled(True)
        self.copyTextButton.setEnabled(True)

    def refresh_images(self) -> None:
        if not self.image_path == '':
            self.srcPixMap: QPixmap = QPixmap(self.image_path)
            scaled = self.srcPixMap.scaled(self.srcImageLabel.size(), Qt.KeepAspectRatio)
            self.srcImageLabel.setPixmap(scaled)
            asciiImage, textLines = converter(self.image_path, SC=self.sc, GCF=self.gcf, bgcolor=self.bgcolor, more_shades=self.more_shades, greyscale=self.greyscale, progress_bar=self.asciiProgressBar)
            self.asciiLines = textLines
            qim = ImageQt(asciiImage)
            self.asciiPixMap = QPixmap.fromImage(qim)
            self.asciiImageLabel.setPixmap(self.asciiPixMap.scaled(self.srcImageLabel.size(), Qt.KeepAspectRatio, Qt.SmoothTransformation))   

    def sc_changed(self) -> None:
        self.sc = float(self.scSlider.value() / 10)

    def gcf_changed(self) -> None:
        self.gcf = self.gcfSlider.value()

    def color_picker(self):
        color = QColorDialog.getColor()
        if color.isValid():
            self.bgColorSample.setStyleSheet(u"QWidget { background-color: %s}" % color.name())
            self.bgcolor = color.name()
            self.refresh_images()

    def greyscale_changed(self) -> None:
        self.greyscale = self.greyscaleCheck.isChecked()
        self.refresh_images()

    def shades_changed(self) -> None:
        self.more_shades = self.moreShades.isChecked()
        self.refresh_images()

    def open_save_as(self) -> None:
        filename = QFileDialog.getSaveFileName(self, "Save File", '', "PNG (*.png);;JPEG (*.jpg, *.jpeg, *.jpe, *.jfif, *.exif)")
        path = filename[0]
        self.asciiPixMap.save(path)

    def copy_image(self) -> None:
        self.clipboard.setPixmap(self.asciiPixMap)

    def copy_text(self) -> None:
        self.clipboard.setText(self.asciiLines)
