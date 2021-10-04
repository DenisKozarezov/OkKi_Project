from PyQt5.QtCore import QSize, QRect, QMetaObject, QCoreApplication, Qt
from PyQt5.QtGui import QFont
from PyQt5.QtWidgets import QWidget, QGridLayout, QVBoxLayout, QPushButton, QLabel, QSizePolicy, QCheckBox, QSlider, QMenuBar, QStatusBar, QFrame, QProgressBar


class Ui_MainWindow(object):
    def setupUi(self, MainWindow) -> None:
        if not MainWindow.objectName():
            MainWindow.setObjectName(u"MainWindow")
        MainWindow.resize(800, 696)
        MainWindow.setAutoFillBackground(False)
        self.centralwidget = QWidget(MainWindow)
        self.centralwidget.setObjectName(u"centralwidget")
        self.gridLayout = QGridLayout(self.centralwidget)
        self.gridLayout.setObjectName(u"gridLayout")
        self.asciiProgressBar = QProgressBar(self.centralwidget)
        self.asciiProgressBar.setObjectName(u"asciiProgressBar")
        self.asciiProgressBar.setMaximum(200)
        self.asciiProgressBar.setValue(0)
        self.asciiProgressBar.setAlignment(Qt.AlignCenter)
        self.asciiProgressBar.setTextVisible(True)
        self.asciiProgressBar.setInvertedAppearance(False)
        self.asciiProgressBar.setTextDirection(QProgressBar.TopToBottom)

        self.gridLayout.addWidget(self.asciiProgressBar, 0, 1, 1, 1)

        self.srcImageLabel = QLabel(self.centralwidget)
        self.srcImageLabel.setObjectName(u"srcImageLabel")
        sizePolicy = QSizePolicy(QSizePolicy.Ignored, QSizePolicy.Ignored)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.srcImageLabel.sizePolicy().hasHeightForWidth())
        self.srcImageLabel.setSizePolicy(sizePolicy)
        self.srcImageLabel.setMinimumSize(QSize(388, 100))
        self.srcImageLabel.setStyleSheet(u"Qt::KeepAspectRatio;")
        self.srcImageLabel.setAlignment(Qt.AlignCenter)

        self.gridLayout.addWidget(self.srcImageLabel, 2, 0, 2, 1)

        self.loadImageButton = QPushButton(self.centralwidget)
        self.loadImageButton.setObjectName(u"loadImageButton")

        self.gridLayout.addWidget(self.loadImageButton, 0, 0, 1, 1)

        self.gridLayout_2 = QGridLayout()
        self.gridLayout_2.setObjectName(u"gridLayout_2")
        self.scLabel = QLabel(self.centralwidget)
        self.scLabel.setObjectName(u"scLabel")

        self.gridLayout_2.addWidget(self.scLabel, 2, 0, 1, 1)

        self.scMinLabel = QLabel(self.centralwidget)
        self.scMinLabel.setObjectName(u"scMinLabel")

        self.gridLayout_2.addWidget(self.scMinLabel, 2, 1, 1, 1)

        self.greyscaleCheck = QCheckBox(self.centralwidget)
        self.greyscaleCheck.setObjectName(u"greyscale")
        self.greyscaleCheck.setChecked(False)

        self.gridLayout_2.addWidget(self.greyscaleCheck, 0, 0, 1, 1, Qt.AlignBottom)

        self.scMaxLabel = QLabel(self.centralwidget)
        self.scMaxLabel.setObjectName(u"scMaxLabel")

        self.gridLayout_2.addWidget(self.scMaxLabel, 2, 3, 1, 1)

        self.bgColorPick = QPushButton(self.centralwidget)
        self.bgColorPick.setObjectName(u"bgColorPick")
        sizePolicy1 = QSizePolicy(QSizePolicy.Minimum, QSizePolicy.Fixed)
        sizePolicy1.setHorizontalStretch(0)
        sizePolicy1.setVerticalStretch(0)
        sizePolicy1.setHeightForWidth(self.bgColorPick.sizePolicy().hasHeightForWidth())
        self.bgColorPick.setSizePolicy(sizePolicy1)
        self.bgColorPick.setMinimumSize(QSize(0, 0))

        self.gridLayout_2.addWidget(self.bgColorPick, 1, 0, 1, 2)

        self.scSlider = QSlider(self.centralwidget)
        self.scSlider.setObjectName(u"scSlider")
        self.scSlider.setMinimum(1)
        self.scSlider.setMaximum(10)
        self.scSlider.setSingleStep(1)
        self.scSlider.setPageStep(5)
        self.scSlider.setOrientation(Qt.Horizontal)
        self.scSlider.setTickPosition(QSlider.TicksAbove)
        self.scSlider.setTickInterval(1)

        self.gridLayout_2.addWidget(self.scSlider, 2, 2, 1, 1)

        self.bgColorSample = QLabel(self.centralwidget)
        self.bgColorSample.setObjectName(u"bgColorSample")
        self.bgColorSample.setAutoFillBackground(False)
        self.bgColorSample.setStyleSheet(u"QWidget { background-color: rgb(255, 255, 255)}")
        self.bgColorSample.setFrameShape(QFrame.Box)
        self.bgColorSample.setTextInteractionFlags(Qt.NoTextInteraction)

        self.gridLayout_2.addWidget(self.bgColorSample, 1, 2, 1, 2)

        self.gcfLabel = QLabel(self.centralwidget)
        self.gcfLabel.setObjectName(u"gcfLabel")

        self.gridLayout_2.addWidget(self.gcfLabel, 3, 0, 1, 1)

        self.gcfMinLabel = QLabel(self.centralwidget)
        self.gcfMinLabel.setObjectName(u"gcfMinLabel")

        self.gridLayout_2.addWidget(self.gcfMinLabel, 3, 1, 1, 1)

        self.gcfMaxLabel = QLabel(self.centralwidget)
        self.gcfMaxLabel.setObjectName(u"gcfMaxLabel")

        self.gridLayout_2.addWidget(self.gcfMaxLabel, 3, 3, 1, 1)

        self.gcfSlider = QSlider(self.centralwidget)
        self.gcfSlider.setObjectName(u"gcfSlider")
        self.gcfSlider.setMinimum(1)
        self.gcfSlider.setMaximum(100)
        self.gcfSlider.setValue(1)
        self.gcfSlider.setSliderPosition(1)
        self.gcfSlider.setOrientation(Qt.Horizontal)
        self.gcfSlider.setTickPosition(QSlider.TicksBelow)
        self.gcfSlider.setTickInterval(10)

        self.gridLayout_2.addWidget(self.gcfSlider, 3, 2, 1, 1)

        self.moreShades = QCheckBox(self.centralwidget)
        self.moreShades.setObjectName(u"moreShades")
        self.moreShades.setChecked(True)

        self.gridLayout_2.addWidget(self.moreShades, 0, 2, 1, 1, Qt.AlignBottom)


        self.gridLayout.addLayout(self.gridLayout_2, 4, 0, 1, 1)

        self.asciiImageLabel = QLabel(self.centralwidget)
        self.asciiImageLabel.setObjectName(u"asciiImageLabel")
        sizePolicy.setHeightForWidth(self.asciiImageLabel.sizePolicy().hasHeightForWidth())
        self.asciiImageLabel.setSizePolicy(sizePolicy)
        self.asciiImageLabel.setMinimumSize(QSize(388, 100))
        font = QFont()
        font.setBold(False)
        font.setWeight(50)
        self.asciiImageLabel.setFont(font)
        self.asciiImageLabel.setStyleSheet(u"Qt::KeepAspectRatio;")
        self.asciiImageLabel.setAlignment(Qt.AlignCenter)

        self.gridLayout.addWidget(self.asciiImageLabel, 2, 1, 2, 1)

        self.verticalLayout = QVBoxLayout()
        self.verticalLayout.setObjectName(u"verticalLayout")
        self.copyImageButton = QPushButton(self.centralwidget)
        self.copyImageButton.setObjectName(u"copyImageButton")

        self.verticalLayout.addWidget(self.copyImageButton)

        self.copyTextButton = QPushButton(self.centralwidget)
        self.copyTextButton.setObjectName(u"copyTextButton")

        self.verticalLayout.addWidget(self.copyTextButton)

        self.saveImageButton = QPushButton(self.centralwidget)
        self.saveImageButton.setObjectName(u"saveImageButton")

        self.verticalLayout.addWidget(self.saveImageButton)


        self.gridLayout.addLayout(self.verticalLayout, 4, 1, 1, 1)

        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QMenuBar(MainWindow)
        self.menubar.setObjectName(u"menubar")
        self.menubar.setGeometry(QRect(0, 0, 800, 21))
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QStatusBar(MainWindow)
        self.statusbar.setObjectName(u"statusbar")
        MainWindow.setStatusBar(self.statusbar)
        QWidget.setTabOrder(self.greyscaleCheck, self.moreShades)
        QWidget.setTabOrder(self.moreShades, self.bgColorPick)
        QWidget.setTabOrder(self.bgColorPick, self.scSlider)
        QWidget.setTabOrder(self.scSlider, self.gcfSlider)
        QWidget.setTabOrder(self.gcfSlider, self.copyImageButton)
        QWidget.setTabOrder(self.copyImageButton, self.copyTextButton)
        QWidget.setTabOrder(self.copyTextButton, self.saveImageButton)

        self.retranslateUi(MainWindow)

        QMetaObject.connectSlotsByName(MainWindow)
    # setupUi

    def retranslateUi(self, MainWindow) -> None:
        MainWindow.setWindowTitle(QCoreApplication.translate("MainWindow", u"OkKi_Project", None))
        self.copyImageButton.setText(QCoreApplication.translate("MainWindow", u"\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u0432 \u0431\u0443\u0444\u0435\u0440 \u043e\u0431\u043c\u0435\u043d\u0430", None))
        self.copyTextButton.setText(QCoreApplication.translate("MainWindow", u"\u0421\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u0442\u0435\u043a\u0441\u0442 \u0432 \u0431\u0443\u0444\u0435\u0440 \u043e\u0431\u043c\u0435\u043d\u0430", None))
        self.saveImageButton.setText(QCoreApplication.translate("MainWindow", u"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c \u043a\u0430\u043a...", None))
        self.srcImageLabel.setText(QCoreApplication.translate("MainWindow", u"ascii", None))
        self.asciiImageLabel.setText(QCoreApplication.translate("MainWindow", u"src", None))
        self.loadImageButton.setText(QCoreApplication.translate("MainWindow", u"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435", None))
        self.scLabel.setText(QCoreApplication.translate("MainWindow", u"\u0414\u0435\u0442\u0430\u043b\u0438:", None))
        self.scMinLabel.setText(QCoreApplication.translate("MainWindow", u"\u041c\u0430\u043b\u043e", None))
        self.greyscaleCheck.setText(QCoreApplication.translate("MainWindow", u"\u0427/\u0411", None))
        self.scMaxLabel.setText(QCoreApplication.translate("MainWindow", u"\u041c\u043d\u043e\u0433\u043e", None))
        self.bgColorPick.setText(QCoreApplication.translate("MainWindow", u"\u0426\u0432\u0435\u0442 \u0444\u043e\u043d\u0430", None))
        self.bgColorSample.setText("")
        self.gcfLabel.setText(QCoreApplication.translate("MainWindow", u"\u041a\u043e\u043d\u0442\u0440\u043e\u0441\u0442\u044c\u043d\u043e\u0441\u0442\u044c:", None))
        self.gcfMinLabel.setText(QCoreApplication.translate("MainWindow", u"1", None))
        self.gcfMaxLabel.setText(QCoreApplication.translate("MainWindow", u"100", None))
        self.moreShades.setText(QCoreApplication.translate("MainWindow", u"\u0411\u043e\u043b\u044c\u0448\u0435 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432", None))
    # retranslateUi